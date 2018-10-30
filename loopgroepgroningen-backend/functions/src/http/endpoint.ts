import {Request, Response} from 'express';
import {Element} from 'jsdom';
import {defaultHandlerFunctionFor} from './default-handler-function-for';
import {HandlerFunction} from './model/handler-function';
import {EndpointDefinition} from './model/endpoint-definition';
import {prepareRequest} from './prepare-request';
import {prepareResponse} from './prepare-response';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {handleError} from './handle-error';

export function endpoint<I, O>(
  endpoint: EndpointDefinition<I, O>
): (originalRequest: Request, eventualResponse: Response) => void {
  return (originalRequest, eventualResponse) => {

    const handlerFunction = handlerFunctionFor(endpoint, originalRequest.method);
    if (!handlerFunction) {
      eventualResponse.status(405).header('Allow', allowedMethods(endpoint)).send('405 Method Not Allowed');
    } else {

      const cookieJar = new SingleUseCookieJar();
      prepareRequest(originalRequest, cookieJar);

      handlerFunction(originalRequest, cookieJar).then(responseObject => {

        prepareResponse(eventualResponse, originalRequest, cookieJar);
        eventualResponse.status(200).send(responseObject);

      }).catch(handleError(eventualResponse, originalRequest, cookieJar));
    }
  }
}

function handlerFunctionFor<I, O>(endpoint: EndpointDefinition<I, O>, method: string): HandlerFunction<O> {
  const explicitHandlerFunction = endpoint.methods && endpoint.methods[method.toLowerCase()];
  switch (explicitHandlerFunction) {
    case false:
      return null;
    case true:
    case undefined:
      return defaultHandlerFunctionFor(endpoint, method);
    default:
      return explicitHandlerFunction;
  }
}

function allowedMethods<I, O>(endpoint: EndpointDefinition<I, O>): string {
  const methods = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch'];
  return methods.filter(method => handlerFunctionFor(endpoint, method)).map(method => method.toUpperCase()).join(', ');
}
