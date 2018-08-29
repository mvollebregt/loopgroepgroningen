import * as functions from 'firebase-functions';
import {Bericht, Credentials, Nieuwsbericht, Session} from './api';
import {scrapeBerichten} from './scrapers/scrape-berichten';
import {Evenementdetail} from './api/evenementdetail';
import {scrapeEvenementdetail} from './scrapers/scrape-evenementdetail';
import {scrapeNieuwsberichten} from './scrapers/scrape-nieuwsberichten';
import {scrapeSession} from './scrapers/scrape-session';
import {endpoint} from './http/endpoint';

export const session = functions.https.onRequest(
  endpoint<Credentials, Session>({
    targetUrl: 'index.php/component/users/profile',
    formSelector: '.login form',
    scraper: scrapeSession()
  })
);

export const laatsteNieuws = functions.https.onRequest(
  endpoint<void, Nieuwsbericht[]>({
    targetUrl: 'index.php/loopgroep-groningen-ledeninfo/laatste-nieuws',
    scraper: scrapeNieuwsberichten()
  })
);

export const prikbord = functions.https.onRequest(
  endpoint<void, Bericht[]>({
    targetUrl: 'index.php/prikbord',
    scraper: scrapeBerichten()
  })
);

export const evenementdetail = functions.https.onRequest(
  endpoint<void, Evenementdetail>({
    targetUrl: 'index.php/loopgroep-groningen-agenda/event/64-lgg-bbq',
    scraper: scrapeEvenementdetail()
  })
);
