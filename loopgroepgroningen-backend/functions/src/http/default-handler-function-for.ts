import {HandlerFunction} from './model/handler-function';
import * as WebRequest from 'web-request';
import {EndpointDefinition} from './model/endpoint-definition';
import {scrapeForm} from '../scrapers/scrape-form';
import {urlFor} from './url-for';
import {scrapeMeldingen} from '../scrapers/scrape-meldingen';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {scrapeIngelogd} from '../scrapers/scrape-ingelogd';

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

function get<I, O>(endpoint: EndpointDefinition<I, O>): HandlerFunction<O> {
  return async (originalRequest, cookieJar) => {
    const serverResponse = await doGet(endpoint.targetUrl, originalRequest.query, endpoint.restricted, cookieJar);
    return endpoint.scraper(serverResponse);
  }
}

function post<I, O>(endpoint: EndpointDefinition<I, O>): HandlerFunction<O> {
  return async (originalRequest, cookieJar) => {

    const inputPage = await doGet(endpoint.targetUrl, {}, endpoint.restricted, cookieJar);
    const initialForm = scrapeForm(endpoint.formSelector)(inputPage);
    if (!initialForm) {
      if (endpoint.formNotAvailableHandler) {
        return endpoint.formNotAvailableHandler(inputPage);
      } else {
        throw {status: 500, meldingen: 'Formulier niet beschikbaar'};
      }
    }

    const postUrl = urlFor(initialForm.action || endpoint.targetUrl);
    const inputMapper = endpoint.inputMapper || (x => x);
    const form = Object.assign(initialForm.inputs, inputMapper(originalRequest.body));

    const serverResponse = await doPost(postUrl, form, cookieJar);
    return endpoint.scraper(serverResponse);

  }
}


async function doGet(relativeUrl: string, query: any, checkIngelogd: boolean, cookieJar: SingleUseCookieJar): Promise<string> {
  const serverResponse = await WebRequest.get(urlFor(relativeUrl, query), {jar: cookieJar});
  handleMessages(serverResponse, checkIngelogd);
  return serverResponse.content;
}

async function doPost(relativeUrl: string, form: any, cookieJar: SingleUseCookieJar): Promise<string> {
  const serverResponse = await WebRequest.post(relativeUrl, {jar: cookieJar, form, followAllRedirects: true});
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
