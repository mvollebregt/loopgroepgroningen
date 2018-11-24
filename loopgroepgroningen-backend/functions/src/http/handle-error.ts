import {Request, Response} from 'express';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {prepareResponse} from './prepare-response';

export function handleError(eventualResponse: Response, originalRequest: Request, cookieJar: SingleUseCookieJar): (error: any) => void {
  return error => {
    const status = error.status || (error.meldingen ? 400 : 500);
    if (status === 500) {
      console.error(error);
    }
    prepareResponse(eventualResponse, originalRequest, cookieJar);
    eventualResponse.status(status).send(error.meldingen);
  }
}
