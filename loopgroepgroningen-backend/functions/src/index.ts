import * as functions from 'firebase-functions';
import {Bericht, Credentials, Evenement, Nieuwsbericht, Session, Trainingsschema} from './api';
import {scrapeBerichten} from './scrapers/scrape-berichten';
import {scrapeNieuwsberichten} from './scrapers/scrape-nieuwsberichten';
import {endpoint} from './http/endpoint';
import {fetchTrainingsschema} from './trainingsschema/fetch-trainingsschema';
import {sessionEndpoint} from './session-endpoint';
import {scrapeAgenda} from './scrapers/scrape-agenda';
import {scrapeEvenement} from './scrapers/scrape-evenement';

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

export const agenda = functions.https.onRequest(
  endpoint<void, Evenement[]>({
    targetUrl: 'index.php/prikbord',
    scraper: scrapeAgenda
  })
);

export const evenement = functions.https.onRequest(
  endpoint<void, Evenement>({
    targetUrl: 'index.php/loopgroep-groningen-agenda/event',
    scraper: scrapeEvenement
  })
);

export const trainingsschema = functions.https.onRequest(
  endpoint<void, Trainingsschema>({
    methods: {
      get: fetchTrainingsschema
    }
  })
);

