import {Element} from 'jsdom';
import {scrape, Scraper} from './scrape';

function scrapeIngelogd(): Scraper<boolean> {
  return scrape('button, [type=submit]', elements => {
    let ingelogd = true;
    for (let button of elements) {
      const value = button.getAttribute('value');
      const text = button.textContent;
      if ((value && value.toLowerCase().indexOf('inloggen') > -1) ||
        (text && text.toLowerCase().indexOf('inloggen') > -1)) {
        ingelogd = false;
      }
    }
    return ingelogd;
  })
}
