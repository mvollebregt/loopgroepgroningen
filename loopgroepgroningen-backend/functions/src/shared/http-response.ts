import * as WebRequest from 'web-request';
import {Request, Response} from 'express';

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
  if (origin && origin.startsWith('http://localhost')) {
    eventualResponse.header('Access-Control-Allow-Origin', origin);
    eventualResponse.header('Access-Control-Allow-Credentials', 'true');
    eventualResponse.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    eventualResponse.header('Access-Control-Max-Age', '1000');
    eventualResponse.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token , Authorization');
  }
}
