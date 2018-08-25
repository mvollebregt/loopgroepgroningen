import * as functions from 'firebase-functions';
import {get, post} from './shared/http';
import {Bericht, LoginRequest, LoginResponse} from './api';
import {scrapeLoginResponse} from './scrapers/scrape-login-response';
import {scrapeBerichten} from './scrapers/scrape-berichten';
import {Evenementdetail} from './api/evenementdetail';
import {scrapeEvenementdetail} from './scrapers/scrape-evenementdetail';

export const login = functions.https.onRequest(
  post<LoginRequest, LoginResponse>(
    'index.php/loopgroep-groningen-ledeninfo',
    '#login-form',
    scrapeLoginResponse())
);

export const prikbord = functions.https.onRequest(
  get<Bericht[]>('index.php/prikbord', scrapeBerichten())
);

export const evenementdetail = functions.https.onRequest(
  // TODO: url parameter!
  get<Evenementdetail>(
    'index.php/loopgroep-groningen-agenda/event/64-lgg-bbq',
    scrapeEvenementdetail())
);
