import * as moment from 'moment';
import {Bericht} from '../api';
import {scrapeList, Scraper} from './scrape';
import {extractRichContent} from './rich-content/extract-rich-content';

export const scrapeBerichten: Scraper<Bericht[]> =
  scrapeList('div.easy_frame', element => {
    const auteur = element.querySelector('.easy_big').textContent.trim();
    const tijdstip = moment(element.querySelector('.easy_small').textContent.trim(), 'dddd DD MMMM YYYY HH:mm');
    const content = element.querySelector('.easy_content');
    return {
      auteur: auteur,
      tijdstip: tijdstip.format('YYYY-MM-DDTHH:mm'),
      berichttekst: extractRichContent(content)
    };
  });

