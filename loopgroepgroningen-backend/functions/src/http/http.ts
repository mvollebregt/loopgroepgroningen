import * as WebRequest from 'web-request';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {Request, Response} from 'express';
import {copyCookiesFromRequest, urlFor} from './http-request';
import {prepareResponse} from './http-response';
import {Element} from 'jsdom';
import * as moment from 'moment';
import {Scraper} from '../scrapers/scrape';
import {scrapeForm} from './scrape-form';

export function get<T>(
  relativeUrl: string,
  scrape: Scraper<T>
): (originalRequest: Request, eventualResponse: Response) => void {
  return (originalRequest: Request, eventualResponse: Response) => {
    moment.locale('nl');
    const cookieJar = new SingleUseCookieJar();
    copyCookiesFromRequest(originalRequest, cookieJar);
    WebRequest.get(urlFor(relativeUrl), {jar: cookieJar}).then(serverResponse => {
      const result = scrape(serverResponse.content);
      prepareResponse(eventualResponse, originalRequest, cookieJar);
      eventualResponse.status(200).send(result);
    }).catch(error =>
      eventualResponse.status(500).send(error)
    );
  }
}

export function post<I, O>(
  relativeUrl: string,
  formSelector: string,
  scrapeOutput: Scraper<O>,
  mapInput: ((input: I) => any) = x => x
): (originalRequest: Request, eventualResponse: Response) => void {
  return (originalRequest: Request, eventualResponse: Response) => {
    doPost(relativeUrl, formSelector, scrapeOutput, mapInput, originalRequest, eventualResponse).then(
      result => eventualResponse.status(200).send(result)
    ).catch(error =>
      eventualResponse.status(500).send(error)
    );
  }
}

async function doPost<I, O>(
  relativeUrl: string,
  formSelector: string,
  scrapeOutput: Scraper<O>,
  mapInput: ((input: I) => any),
  originalRequest: Request,
  eventualResponse: Response): Promise<O> {
  const cookieJar = new SingleUseCookieJar();
  copyCookiesFromRequest(originalRequest, cookieJar);

  const inputPage = await WebRequest.get(urlFor(relativeUrl), {jar: cookieJar});
  const {action, inputs} = scrapeForm(formSelector)(inputPage.content);

  const postUrl = urlFor(action || relativeUrl);
  const form = Object.assign(inputs, mapInput(originalRequest.body));

  const serverResponse = await WebRequest.post(postUrl, {jar: cookieJar, form, followAllRedirects: true});
  const result = scrapeOutput(serverResponse.content);

  prepareResponse(eventualResponse, originalRequest, cookieJar);
  return result;

}
