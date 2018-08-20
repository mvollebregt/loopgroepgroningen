import * as WebRequest from 'web-request';
import {Request} from 'express';
import {SingleUseCookieJar} from './single-use-cookie-jar';

const baseUrl = 'http://www.loopgroepgroningen.nl/';

export function get(relativeUrl: string, originalRequest: Request, cookieJar = new SingleUseCookieJar()): Promise<WebRequest.Response<string>> {
  copyCookiesFromRequest(originalRequest, cookieJar);
  return WebRequest.get(urlFor(relativeUrl), {jar: cookieJar});
}

function urlFor(relativeUrl: string): string {
  return relativeUrl.startsWith('/') ? baseUrl + relativeUrl.substring(1) : baseUrl + relativeUrl;
}

function copyCookiesFromRequest(originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  const cookieHeader = originalRequest.headers['cookie'];
  if (cookieHeader) {
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
    cookies.forEach(cookie => cookieJar.setCookie(cookie));
  }
}
