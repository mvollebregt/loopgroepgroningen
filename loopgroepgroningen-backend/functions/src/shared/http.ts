import * as WebRequest from 'web-request';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {Request, Response} from 'express';
import {copyCookiesFromRequest, scrape, urlFor} from './http-request';
import {prepareResponse} from './http-response';
import {Element} from 'jsdom';
import * as moment from 'moment';

export function get<T>(
  relativeUrl: string,
  selector: string,
  mapper: ((elt: Element) => T)
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
