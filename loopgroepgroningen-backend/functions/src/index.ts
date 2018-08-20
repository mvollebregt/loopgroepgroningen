import * as functions from 'firebase-functions';
import {get} from './shared/http';
import {mapToBericht} from './mappers/prikbord';
import {Bericht} from './api/bericht';

export const prikbord = functions.https.onRequest(
  get<Bericht>('index.php/prikbord', 'div.easy_frame', mapToBericht)
);
