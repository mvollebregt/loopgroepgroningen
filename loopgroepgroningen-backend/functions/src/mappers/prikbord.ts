import { JSDOM, Element } from 'jsdom';
import * as moment from 'moment';
import {extractRichContent} from '../rich-content/rich-content.service';
import {Bericht} from '../api';

export function mapToBericht(node: Element): Bericht {
  const auteur = node.querySelector('.easy_big').textContent.trim();
  const tijdstip = moment(node.querySelector('.easy_small').textContent.trim(), 'dddd DD MMMM YYYY HH:mm');
  const content = node.querySelector('.easy_content');
  return {
    auteur: auteur,
    tijdstip: tijdstip.format('YYYY-MM-DDTHH:mm'),
    berichttekst: extractRichContent(content)
  };
}
