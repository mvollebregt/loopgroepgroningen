import {Evenement} from '../api/agenda';
import {scrapeList, Scraper} from './scrape';
import {Element} from 'jsdom';
import * as moment from 'moment';
import {getIdFromUrl} from '../http/get-id-from-url';

export const scrapeAgenda: Scraper<Evenement[]> = scrapeList('li.jemmod', elt => {
  const alleDatums = elt.querySelectorAll('.jem_date-1');
  const alleTijden = elt.querySelectorAll('.jem_time-1');
  const link = elt.querySelector('a');
  return {
    id: getIdFromUrl(link.getAttribute('href')),
    start: toISOString(alleDatums.item(0), alleTijden.item(0)),
    einde: toISOString(alleDatums.item(alleDatums.length - 1), alleTijden.item(alleTijden.length - 1)),
    naam: link.textContent.trim(),
  };
});

function toISOString(datum: Element, tijd: Element): string {
  if (!datum || !datum.textContent) {
    return null;
  } else if (!tijd || !tijd.textContent) {
    return moment(datum.textContent.trim(), "DD MMM YYYY HH:mm").toISOString();
  } else {
    return moment(`${datum.textContent.trim()} ${tijd.textContent.trim()}`, "DD MMM YYYY HH:mm").toISOString();
  }
}

