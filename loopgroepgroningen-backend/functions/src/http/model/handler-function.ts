import {Request} from 'express';
import {SingleUseCookieJar} from '../single-use-cookie-jar';

export type HandlerFunction<T> = (originalRequest: Request, cookieJar: SingleUseCookieJar) => Promise<T>;
