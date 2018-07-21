import {Injectable} from '@angular/core';
import {RichContent} from './rich-content';
import {toParagraaf} from './to-paragraaf';

@Injectable()
export class RichContentService {

  extractRichContent(element: Element): RichContent {
    return toParagraaf(element);
  }

}
