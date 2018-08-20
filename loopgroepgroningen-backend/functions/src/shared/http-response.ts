import * as WebRequest from 'web-request';
import {Request, Response} from 'express';

const allowedDomains = [
  'http://localhost:4200',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:8200'
];

export function prepareResponse(eventualResponse: Response, retrievedResponse:WebRequest.Response<string>, originalRequest: Request): void {
  copyCookiesToResponse(eventualResponse, retrievedResponse);
  setCorsHeaders(eventualResponse, originalRequest);
}

function copyCookiesToResponse(eventualResponse: Response, response: WebRequest.Response<string>): void {
  const originalCookies: string[] = response.headers['set-cookie'] || [];
  // TODO: localhost is nu nog hard coded value
  const rewrittenCookies = originalCookies.map(cookie =>
    cookie
      .replace('www.loopgroepgroningen.nl', 'localhost')
      .replace('domain=.', 'domain=localhost')
  );
  eventualResponse.append('set-cookie', rewrittenCookies);
}

function setCorsHeaders(eventualResponse: Response, originalRequest: Request): void {
  const origin = originalRequest.get('origin');
  const allowedDomain = allowedDomains.find(domain => origin === domain);
  if (allowedDomain) {
    eventualResponse.header('Access-Control-Allow-Origin', allowedDomain);
    eventualResponse.header('Access-Control-Allow-Credentials', 'true');
    eventualResponse.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    eventualResponse.header('Access-Control-Max-Age', '1000');
    eventualResponse.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token , Authorization');
  }
}
