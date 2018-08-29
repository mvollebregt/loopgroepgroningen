import {scrape, Scraper} from './scrape';
import {Evenementdetail} from '../api/evenementdetail';
import {Bericht} from '../api';
import * as moment from 'moment';
import {extractRichContent} from './rich-content/extract-rich-content';

export const scrapeEvenementdetail: Scraper<Evenementdetail> =

  // TODO: functie "scrapeOne" maken
  scrape('#jem', elements => {

    const elt = elements[0];

    const start = elt.querySelector('[itemprop="startDate"]').getAttribute('content');
    const einde = elt.querySelector('[itemprop="endDate"]').getAttribute('content');
    const naam = elt.querySelector('[itemprop="name"]').textContent.trim();
    const categorie = elt.querySelector('dd.category').textContent.trim();
    const omschrijving = extractRichContent(elt.querySelector('[itemprop="description"]'));


    const deelnemerElementen = elt.querySelectorAll('.register li .username');
    let deelnemers: string[] = [];
    for (let i = 0; i < deelnemerElementen.length; i++) {
      deelnemers.push(deelnemerElementen.item(i).textContent.trim());
    }

    const reactieElementen = elt.querySelectorAll('.comment-box');
    let reacties: Bericht[] = [];
    for (let i = reactieElementen.length - 1; i >= 0; i--) {
      const element = reactieElementen.item(i);
      reacties.push({
        auteur: element.querySelector('.comment-author').textContent,
        tijdstip: moment(element.querySelector('.comment-date').textContent, 'DD-MM-YYYY HH:mm').toISOString(),
        berichttekst: extractRichContent(element.querySelector('.comment-body'))
      })
    }

    const registrerenMogelijk = elt.querySelector('.register form');
    const deelname = registrerenMogelijk && registrerenMogelijk.textContent.toLowerCase().indexOf('uitschrijven') > -1;

    return {
      start,
      einde,
      naam,
      categorie,
      omschrijving,
      deelname,
      deelnemers,
      reacties
    };
  });

