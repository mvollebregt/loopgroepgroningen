import * as WebRequest from 'web-request';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {Request, Response} from 'express';
import {copyCookiesFromRequest, scrape, urlFor} from './http-request';
import {prepareResponse} from './http-response';
import {Element} from 'jsdom';
import * as moment from 'moment';
import {toFormDetails} from './http-forms';

export function get<T>(
  relativeUrl: string,
  selector: string,
  mapper: ((elt: Element[]) => T)
): (originalRequest: Request, eventualResponse: Response) => void {
  return (originalRequest: Request, eventualResponse: Response) => {
    moment.locale('nl');
    const cookieJar = new SingleUseCookieJar();
    copyCookiesFromRequest(originalRequest, cookieJar);
    WebRequest.get(urlFor(relativeUrl), {jar: cookieJar}).then(serverResponse => {
      const result = scrape(serverResponse.content, selector, mapper);
      prepareResponse(eventualResponse, serverResponse, originalRequest);
      eventualResponse.status(200).send(result);
    }).catch(error =>
      eventualResponse.status(500).send(error)
    );
  }
}

export function post<I, O>(
  relativeUrl: string,
  formSelector: string,
  outputSelector: string,
  outputMapper: ((elt: Element[]) => O),
  inputMapper: ((input: I) => any) = x => x
): (originalRequest: Request, eventualResponse: Response) => void {
  return (originalRequest: Request, eventualResponse: Response) => {
    doPost(relativeUrl, formSelector, outputSelector, outputMapper, inputMapper, originalRequest, eventualResponse).then(
      result => eventualResponse.status(200).send(result)
    ).catch(error =>
      eventualResponse.status(500).send(error)
    );
  }
}

async function doPost<I, O>(
  relativeUrl: string,
  formSelector: string,
  outputSelector: string,
  outputMapper: ((elt: Element[]) => O),
  inputMapper: ((input: I) => any),
  originalRequest: Request,
  eventualResponse: Response): Promise<O> {
  const cookieJar = new SingleUseCookieJar();
  copyCookiesFromRequest(originalRequest, cookieJar);

  const inputPage = await WebRequest.get(urlFor(relativeUrl), {jar: cookieJar});
  const {action, inputs} = scrape(inputPage.content, formSelector, toFormDetails);

  const postUrl = urlFor(action || relativeUrl);
  const form = Object.assign(inputs, inputMapper(originalRequest.body));

  const serverResponse = await WebRequest.post(postUrl, {jar: cookieJar, form, followAllRedirects: true});
  const result = scrape(serverResponse.content, outputSelector, outputMapper);

  prepareResponse(eventualResponse, serverResponse, originalRequest);
  return result;

}
