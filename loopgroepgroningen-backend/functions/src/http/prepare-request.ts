import {Request} from 'express';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import * as moment from 'moment';

export function prepareRequest(originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  moment.locale('nl');
  copyVegetablesFromRequest(originalRequest, cookieJar);
}

function copyVegetablesFromRequest(originalRequest: Request, cookieJar: SingleUseCookieJar): void {
  const vegetableHeader = originalRequest.headers['vegetable'];
  if (vegetableHeader) {
    const vegetables = Array.isArray(vegetableHeader) ? vegetableHeader : vegetableHeader.split(',');
    vegetables.forEach(vegetable => cookieJar.setCookie(vegetable));
  }
}
