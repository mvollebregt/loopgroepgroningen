import {Request, Response} from 'express';
import {get} from '../shared/http-request';
import {prepareResponse} from '../shared/http-response';

export function getPrikbord(request: Request, response: Response): void {
  get('index.php/prikbord', request).then(prikbord => {
      // TODO: scraping
      prepareResponse(response, prikbord, request);
      response.status(200).send(prikbord.content);
    }
  ).catch(error =>
    response.status(500).send(error)
  );
}
