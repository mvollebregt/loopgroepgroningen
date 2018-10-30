import * as functions from 'firebase-functions';
import {Bericht, Credentials, Evenementdetail, Nieuwsbericht, Session} from './api';
import {scrapeBerichten} from './scrapers/scrape-berichten';
import {scrapeEvenementdetail} from './scrapers/scrape-evenementdetail';
import {scrapeNieuwsberichten} from './scrapers/scrape-nieuwsberichten';
import {endpoint} from './http/endpoint';
import {fetchTrainingsschema} from './trainingsschema/trainingsschema';
import {sessionEndpoint} from './session-endpoint';

export const session = functions.https.onRequest(endpoint<Credentials, Session>(sessionEndpoint));

export const laatsteNieuws = functions.https.onRequest(
  endpoint<void, Nieuwsbericht[]>({
    targetUrl: 'index.php/loopgroep-groningen-ledeninfo/laatste-nieuws',
    scraper: scrapeNieuwsberichten,
    restricted: true
  })
);

export const prikbord = functions.https.onRequest(
  endpoint<void, Bericht[]>({
    targetUrl: 'index.php/prikbord',
    scraper: scrapeBerichten
  })
);

export const trainingsschema = functions.https.onRequest(fetchTrainingsschema);

export const evenementdetail = functions.https.onRequest(
  endpoint<void, Evenementdetail>({
    targetUrl: 'index.php/loopgroep-groningen-agenda/event/64-lgg-bbq',
    scraper: scrapeEvenementdetail
  })
);
