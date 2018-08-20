import {Request} from 'express';
import {JSDOM, Element} from 'jsdom';
import {SingleUseCookieJar} from './single-use-cookie-jar';

const baseUrl = 'http://www.loopgroepgroningen.nl/';

export function urlFor(relativeUrl: string): string {
  return relativeUrl.startsWith('/') ? baseUrl + relativeUrl.substring(1) : baseUrl + relativeUrl;
}

export function copyCookiesFromRequest(originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  const cookieHeader = originalRequest.headers['cookie'];
  if (cookieHeader) {
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
    cookies.forEach(cookie => cookieJar.setCookie(cookie));
  }
}

export function scrape<T>(body: string, selector: string, mapper: (elt: Element) => T): T[] {
  const doc = new JSDOM(body).window.document;
  const elements = doc.querySelectorAll(selector);
  const result = [];
  for (let i = 0; i < elements.length; i++) {
    result.push(mapper(elements.item(i)));
  }
  return result;
}