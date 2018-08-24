import {LoginResponse} from '../api';
import {Element} from 'jsdom';
import {scrape, scrapeCombined, scrapeList, Scraper} from './scrape';

export function scrapeLoginResponse(): Scraper<LoginResponse> {
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

function scrapeMeldingen(): Scraper<string[]> {
  return scrapeList('#system-message-container .warning li', element => element.textContent.trim());
}
