import {Injectable} from '@angular/core';
import {PlainText, RichContentType} from './rich-content';
import {Paragraaf} from './paragraaf';
import {RichContentBuilder} from './rich-content-builder';

@Injectable()
export class RichContentService {

  extractRichContent(element: Node): Paragraaf[] {
    const richContentBuilder = new RichContentBuilder();
    richContentBuilder.extractRichContent([element]);
    return richContentBuilder.build();
  }

  samenvatting(paragrafen: Paragraaf[], length: number): string {
    let text = '';
    for (let paragraaf of paragrafen) {
      for (let alinea of paragraaf.alineas) {
        for (let content of alinea.content) {
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
