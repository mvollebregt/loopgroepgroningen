import {Request} from 'express';
import {Element, JSDOM} from 'jsdom';
import {SingleUseCookieJar} from './single-use-cookie-jar';

const baseUrl = 'http://www.loopgroepgroningen.nl/';

export function urlFor(relativeUrl: string): string {
  return relativeUrl.startsWith('/') ? baseUrl + relativeUrl.substring(1) : baseUrl + relativeUrl;
}

export function copyCookiesFromRequest(originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  const cookieHeader = originalRequest.headers['cookie'];
  if (cookieHeader) {
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : cookieHeader.split(';');
    cookies.forEach(cookie => cookieJar.setCookie(cookie));
  }
}
