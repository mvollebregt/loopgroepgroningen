import {scrapeList} from './scrape';
import {Nieuwsbericht} from '../api/nieuwsbericht';
import * as moment from 'moment';
import {extractRichContent} from './rich-content/extract-rich-content';

export function scrapeNieuwsberichten() {
  return scrapeList<Nieuwsbericht>(
    '*[itemprop=blogPost] .loopgroepgroningen-post', (element, volgnummer) => {

      const titel = element.querySelector('.loopgroepgroningen-postheader').textContent.trim();
      const datumNode = element.querySelector('strong');
      const datum = datumNode && moment(datumNode.textContent.trim(), "DD/MM/YYYY").format('YYYY-MM-DD');
      let content = extractRichContent(element.querySelector('.loopgroepgroningen-article'));
      // als het bericht een datum heeft staat die in de eerste paragraaf, die laten we dan weg
      content = datum ? content.slice(1) : content;
      const samenvatting = 'TODO: samenvatting'; // TODO samenvatting(content, 50);
      const thumbnail = element.querySelector('img').getAttribute('src');
      return {
        volgnummer,
        titel,
        samenvatting,
        content,
        thumbnail,
        datum
      }
    }
  )
}