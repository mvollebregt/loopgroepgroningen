import {HandlerFunction} from './model/handler-function';
import * as WebRequest from 'web-request';
import {EndpointDefinition} from './model/endpoint-definition';
import {scrapeForm} from '../scrapers/scrape-form';
import {urlFor} from './url-for';
import {scrapeMeldingen} from '../scrapers/scrape-meldingen';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {scrapeIngelogd} from '../scrapers/scrape-ingelogd';
import {getIdFromUrl} from './get-id-from-url';
import {Request} from 'express';

export function defaultHandlerFunctionFor<I, O>(endpoint: EndpointDefinition<I, O>, method: string): HandlerFunction<O> {
  switch (method.toLowerCase()) {
    case 'get':
      if (endpoint.targetUrl && endpoint.scraper) {
        return get(endpoint);
      }
      break;
    case 'post':
      if (endpoint.targetUrl && endpoint.scraper && endpoint.formSelector) {
        return post(endpoint);
      }
      break;
    case 'options':
      return () => Promise.resolve(null);
  }
  return null;
}

function addIdToResult(result: any, originalRequest: Request) {
  if (result && originalRequest.url) {
    result['id'] = getIdFromUrl(originalRequest.url) || undefined;
  }
}

function get<I, O>(endpoint: EndpointDefinition<I, O>): HandlerFunction<O> {
  return async (originalRequest, cookieJar) => {
    const serverResponse = await doGet(endpoint.targetUrl, originalRequest.url, originalRequest.query, endpoint.restricted, cookieJar);
    const result = endpoint.scraper(serverResponse);
    addIdToResult(result, originalRequest);
    return result;
  }
}

function post<I, O>(endpoint: EndpointDefinition<I, O>): HandlerFunction<O> {
  return async (originalRequest, cookieJar) => {

    const pathParams = originalRequest.url;
    const inputPage = await doGet(endpoint.targetUrl, pathParams, {}, endpoint.restricted, cookieJar);
    const initialForm = scrapeForm(endpoint.formSelector)(inputPage);
    if (!initialForm) {
      if (endpoint.formNotAvailableHandler) {
        return endpoint.formNotAvailableHandler(inputPage);
      } else {
        throw {status: 500, meldingen: ['Formulier niet beschikbaar']};
      }
    }

    const postUrl =
      endpoint.postUrl ? urlFor(endpoint.postUrl)
        : initialForm.action ? urlFor(initialForm.action)
        : urlFor(endpoint.targetUrl, pathParams);

    console.log(postUrl);

    const inputMapper = endpoint.inputMapper || (x => x);
    const form = Object.assign(initialForm.inputs, inputMapper(originalRequest.body));
    console.log(form);

    const serverResponse = await doPost(postUrl, form, cookieJar);
    console.log(serverResponse);
    const result = endpoint.scraper(serverResponse);
    addIdToResult(result, originalRequest);
    return result;
  }
}

async function doGet(relativeUrl: string, pathParams: string, query: any, checkIngelogd: boolean, cookieJar: SingleUseCookieJar): Promise<string> {
  const serverResponse = await WebRequest.get(urlFor(relativeUrl, pathParams, query), {jar: cookieJar});
  handleMessages(serverResponse, checkIngelogd);
  return serverResponse.content;
}

async function doPost(relativeUrl: string, form: any, cookieJar: SingleUseCookieJar): Promise<string> {
  console.log(cookieJar);
  const serverResponse = await WebRequest.post(relativeUrl, {jar: cookieJar, form, followAllRedirects: true,});
  handleMessages(serverResponse, true);
  return serverResponse.content;
}

function handleMessages(serverResponse: WebRequest.Response<string>, checkIngelogd = false) {
  const content = serverResponse.content;
  const meldingen = scrapeMeldingen(content);
  if (checkIngelogd) {
    const ingelogd = scrapeIngelogd(content);
    if (!ingelogd) {
      throw {status: 401, meldingen: meldingen.length > 0 ? meldingen : undefined};
    }
  }
  if (meldingen.length > 0) {
    throw {meldingen};
  }
}
