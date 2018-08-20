import {RichContentBuilder} from './rich-content-builder';
import {Node} from 'jsdom';
import {Paragraaf} from '../api/rich-content/paragraaf';

export function extractRichContent(element: Node): Paragraaf[] {
  if (!element) {
    return null;
  } else {
    const richContentBuilder = new RichContentBuilder();
    richContentBuilder.extractRichContent([element]);
    return richContentBuilder.build();
  }
}

// export function samenvatting(paragrafen: Paragraaf[], length: number): string {
//   let text = '';
//   for (const paragraaf of paragrafen) {
//     for (const alinea of paragraaf.alineas) {
//       for (const content of alinea.content) {
//         if (content.type === RichContentType.TEXT) {
//           text += (content as PlainText).tekst + ' ';
//         }
//         if (text.length >= length) {
//           return text;
//         }
//       }
//     }
//   }
//   return text;
// }
