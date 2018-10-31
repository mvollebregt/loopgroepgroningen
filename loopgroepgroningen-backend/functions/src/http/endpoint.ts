import {Request, Response} from 'express';
import {defaultHandlerFunctionFor} from './default-handler-function-for';
import {HandlerFunction} from './model/handler-function';
import {EndpointDefinition} from './model/endpoint-definition';
import {prepareRequest} from './prepare-request';
import {prepareResponse} from './prepare-response';
import {SingleUseCookieJar} from './single-use-cookie-jar';
import {handleError} from './handle-error';

export function endpoint<I, O>(
  endpointDefinition: EndpointDefinition<I, O>
): (originalRequest: Request, eventualResponse: Response) => void {
  return (originalRequest, eventualResponse) => {

    const handlerFunction = handlerFunctionFor(endpointDefinition, originalRequest.method);
    if (!handlerFunction) {
      eventualResponse.status(405).header('Allow', allowedMethods(endpointDefinition)).send('405 Method Not Allowed');
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

function handlerFunctionFor<I, O>(endpointDefinition: EndpointDefinition<I, O>, method: string): HandlerFunction<O> {
  const explicitHandlerFunction = endpointDefinition.methods && endpointDefinition.methods[method.toLowerCase()];
  switch (explicitHandlerFunction) {
    case false:
      return null;
    case true:
    case undefined:
      return defaultHandlerFunctionFor(endpointDefinition, method);
    default:
      return explicitHandlerFunction;
  }
}

function allowedMethods<I, O>(endpointDefinition: EndpointDefinition<I, O>): string {
  const methods = ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch'];
  return methods.filter(method => handlerFunctionFor(endpointDefinition, method)).map(method => method.toUpperCase()).join(', ');
}
