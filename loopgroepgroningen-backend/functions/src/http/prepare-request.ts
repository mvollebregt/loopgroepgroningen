import {Request} from 'express';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import * as moment from 'moment';

export function prepareRequest(originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  moment.locale('nl');
  copyCookiesFromRequest(originalRequest, cookieJar);
}

function copyCookiesFromRequest(originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  const cookieHeader = originalRequest.headers['cookie'];
  if (cookieHeader) {
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : cookieHeader.split(';');
    cookies.forEach(cookie => cookieJar.setCookie(cookie));
  }
}
