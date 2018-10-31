import {Request} from 'express';
import {sessionEndpoint} from '../session-endpoint';
import {SingleUseCookieJar} from '../http/single-use-cookie-jar';
import {defaultHandlerFunctionFor} from '../http/default-handler-function-for';
import {trainingsschema} from './trainingsschema';
import {Trainingsschema} from '../api/trainingsschema';

export async function fetchTrainingsschema(originalRequest: Request, cookieJar: SingleUseCookieJar): Promise<Trainingsschema> {
  const session = await defaultHandlerFunctionFor(sessionEndpoint, 'get')(originalRequest, cookieJar);
  if (session.loggedIn) {
    return trainingsschema;
  } else {
    throw {status: 401, meldingen: ['U dient eerst in te loggen']};
  }
}
