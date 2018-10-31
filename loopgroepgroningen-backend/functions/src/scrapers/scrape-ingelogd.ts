import {scrape, Scraper} from './scrape';

export const scrapeIngelogd: Scraper<boolean> =
  scrape('button, [type=submit]', elements => {
    let ingelogd = true;
    for (const button of elements) {
      const value = button.getAttribute('value');
      const text = button.textContent;
      if ((value && value.toLowerCase().indexOf('inloggen') > -1) ||
        (text && text.toLowerCase().indexOf('inloggen') > -1)) {
        ingelogd = false;
      }
    }
    return ingelogd;
  });
