import {HandlerFunction} from './model/handler-function';
import * as WebRequest from 'web-request';
import {EndpointDefinition} from './model/endpoint-definition';
import {scrapeForm} from '../scrapers/scrape-form';
import {urlFor} from './url-for';

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
  }
  return null;
}

function get<I, O>(endpoint: EndpointDefinition<I, O>): HandlerFunction<O> {
  return async (originalRequest, cookieJar) => {
    const serverResponse = await WebRequest.get(urlFor(endpoint.targetUrl), {jar: cookieJar});
    return endpoint.scraper(serverResponse.content);
  }
}

function post<I, O>(endpoint: EndpointDefinition<I, O>): HandlerFunction<O> {
  return async (originalRequest, cookieJar) => {

    const inputPage = await WebRequest.get(urlFor(endpoint.targetUrl), {jar: cookieJar});
    const {action, inputs} = scrapeForm(endpoint.formSelector)(inputPage.content);

    const postUrl = urlFor(action || endpoint.targetUrl);
    const inputMapper = endpoint.inputMapper || (x => x);
    const form = Object.assign(inputs, inputMapper(originalRequest.body));

    const serverResponse = await WebRequest.post(postUrl, {jar: cookieJar, form, followAllRedirects: true});
    return endpoint.scraper(serverResponse.content);

  }
}
