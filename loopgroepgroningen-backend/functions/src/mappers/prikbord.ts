import {Element} from 'jsdom';
import * as moment from 'moment';
import {extractRichContent} from '../rich-content/rich-content.service';
import {Bericht} from '../api';
import {mapAll} from './map-all';

export function mapToBerichten(elements: Element[]): Bericht[] {
  return mapAll(elements, element => {
    const auteur = element.querySelector('.easy_big').textContent.trim();
    const tijdstip = moment(element.querySelector('.easy_small').textContent.trim(), 'dddd DD MMMM YYYY HH:mm');
    const content = element.querySelector('.easy_content');
    return {
      auteur: auteur,
      tijdstip: tijdstip.format('YYYY-MM-DDTHH:mm'),
      berichttekst: extractRichContent(content)
    };
  });
}
