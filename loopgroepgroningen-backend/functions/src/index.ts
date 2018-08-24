import * as functions from 'firebase-functions';
import {get, post} from './shared/http';
import {Bericht, LoginRequest, LoginResponse} from './api';
import {scrapeLoginResponse} from './scrapers/scrape-login-response';
import {scrapeBerichten} from './scrapers/scrape-berichten';

export const login = functions.https.onRequest(
  post<LoginRequest, LoginResponse>(
    'index.php/loopgroep-groningen-ledeninfo',
    '#login-form',
    scrapeLoginResponse())
);

export const prikbord = functions.https.onRequest(
  get<Bericht[]>('index.php/prikbord', scrapeBerichten())
);
