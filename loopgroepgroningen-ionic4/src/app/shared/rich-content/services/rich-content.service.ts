import {Injectable} from '@angular/core';
import {RichContentBuilder} from './rich-content-builder';
import {Paragraaf} from '../models/paragraaf';
import {PlainText, RichContentType} from '../models/rich-content';

@Injectable({providedIn: 'root'})
export class RichContentService {

  extractRichContent(element: Node): Paragraaf[] {
    if (!element) {
      return null;
    } else {
      const richContentBuilder = new RichContentBuilder();
      richContentBuilder.extractRichContent([element]);
      return richContentBuilder.build();
    }
  }

  samenvatting(paragrafen: Paragraaf[], length: number): string {
    let text = '';
    for (const paragraaf of paragrafen) {
      for (const alinea of paragraaf.alineas) {
        for (const content of alinea.content) {
          if (content.type === RichContentType.TEXT) {
            text += (content as PlainText).tekst + ' ';
          }
          if (text.length >= length) {
            return text;
          }
        }
      }
    }
    return text;
  }
}
