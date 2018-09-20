import {scrapeList} from './scrape';
import {Nieuwsbericht} from '../api';
import * as moment from 'moment';
import {extractRichContent} from './rich-content/extract-rich-content';
import {urlFor} from '../http/url-for';

export const scrapeNieuwsberichten =
  scrapeList<Nieuwsbericht>(
    '*[itemprop=blogPost] .loopgroepgroningen-post', element => {

      const header = element.querySelector('.loopgroepgroningen-postheader');
      const href = header.querySelector('a')['href'];
      const titel = header.textContent.trim();
      const datumNode = element.querySelector('strong');
      const datum = datumNode && moment(datumNode.textContent.trim(), "DD/MM/YYYY").format('YYYY-MM-DD');
      let content = extractRichContent(element.querySelector('.loopgroepgroningen-article'));
      // als het bericht een datum heeft staat die in de eerste paragraaf, die laten we dan weg
      content = datum ? content.slice(1) : content;
      const samenvatting = 'TODO: samenvatting'; // TODO samenvatting(content, 50);
      const img = element.querySelector('img');
      const thumbnail = img && urlFor(img.getAttribute('src'));
      return {
        href,
        titel,
        samenvatting,
        content,
        thumbnail,
        datum
      }
    }
  );
