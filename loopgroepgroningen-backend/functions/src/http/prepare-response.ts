import {Request, Response} from 'express';
import {SingleUseCookieJar} from './single-use-cookie-jar';

export function prepareResponse(eventualResponse: Response, originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  copyCookiesToResponse(eventualResponse, cookieJar, originalRequest.protocol === 'http');
  setCorsHeaders(eventualResponse, originalRequest);
}

function copyCookiesToResponse(eventualResponse: Response, cookieJar: SingleUseCookieJar, insecure: boolean): void {
  const originalCookies: string[] = cookieJar.getResponseCookies();
  const rewrittenCookies = originalCookies.map(rewriteCookie(insecure));
  eventualResponse.append('set-cookie', rewrittenCookies);
}

function rewriteCookie(insecure: boolean) {
  return (cookie: string) => {
    // TODO: localhost is nu nog hard coded value
    const rewrittenCookie = cookie
      .replace('www.loopgroepgroningen.nl', 'localhost')
      .replace('domain=.', 'domain=localhost');
    // op localhost draaien we op http en niet op https, vandaar dat we 'secure' op localhost uit de cookie strippen
    return insecure ? rewrittenCookie.replace(/secure; /gi, '') : rewrittenCookie;
  }
}

function setCorsHeaders(eventualResponse: Response, originalRequest: Request): void {
  const origin = originalRequest.get('origin');
  if (origin && origin.startsWith('http://localhost')) {
    eventualResponse.header('Access-Control-Allow-Origin', origin);
    eventualResponse.header('Access-Control-Allow-Credentials', 'true');
    eventualResponse.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    eventualResponse.header('Access-Control-Max-Age', '1000');
    eventualResponse.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token , Authorization');
  }
}
