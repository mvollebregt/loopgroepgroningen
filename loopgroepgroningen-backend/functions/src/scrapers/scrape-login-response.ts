import {Session} from '../api';
import {Element} from 'jsdom';
import {scrape, scrapeCombined, Scraper} from './scrape';
import {scrapeMeldingen} from './scrape-meldingen';

export function scrapeLoginResponse(): Scraper<Session> {
  return scrapeCombined(scrapeSucces(), scrapeMeldingen(), (succes, meldingen) => ({succes, meldingen}));
}

function scrapeSucces(): Scraper<boolean> {
  return scrape('button', elements => {
    let succes = true;
    for (let button of elements) {
      const value = button.getAttribute('value');
      const text = button.textContent;
      if ((value && value.toLowerCase().indexOf('inloggen') > -1) ||
        (text && text.toLowerCase().indexOf('inloggen') > -1)) {
        succes = false;
      }
    }
    return succes;
  })
}
