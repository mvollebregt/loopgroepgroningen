import {Injectable} from '@angular/core';
import {Paragraaf, RichContentContainer} from './rich-content';
import {toParagraaf} from './to-paragraaf';

@Injectable()
export class RichContentService {

  extractRichContent(element: Element): RichContentContainer {
    return new RichContentContainer(
      toParagraaf(element).map(tekst => new Paragraaf(tekst)));
  }
}
