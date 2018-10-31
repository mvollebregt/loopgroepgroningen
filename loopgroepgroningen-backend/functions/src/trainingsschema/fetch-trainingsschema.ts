import {Request, Response} from 'express';
import {sessionEndpoint} from '../session-endpoint';
import {SingleUseCookieJar} from '../http/single-use-cookie-jar';
import {prepareRequest} from '../http/prepare-request';
import {defaultHandlerFunctionFor} from '../http/default-handler-function-for';
import {handleError} from '../http/handle-error';
import {prepareResponse} from '../http/prepare-response';
import {trainingsschema} from './trainingsschema';

export function fetchTrainingsschema(originalRequest: Request, eventualResponse: Response): void {

  const cookieJar = new SingleUseCookieJar();
  prepareRequest(originalRequest, cookieJar);

  defaultHandlerFunctionFor(sessionEndpoint, 'get')(originalRequest, cookieJar).then(session => {
      if (session.loggedIn) {
        prepareResponse(eventualResponse, originalRequest, cookieJar);
        eventualResponse.status(200).send(trainingsschema);
      } else {
        throw {status: 401, meldingen: ['U dient eerst in te loggen']};
      }
    }
  ).catch(handleError(eventualResponse, originalRequest, cookieJar));
}
