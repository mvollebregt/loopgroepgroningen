import {Injectable} from '@angular/core';
import {Afbeelding, Link, PlainText, RichContent, RichContentType} from './rich-content';
import {RichContentDoc} from './rich-content-doc';
import {Paragraaf} from './paragraaf';

@Injectable()
export class RichContentService {

  extractRichContent(element: Node): Paragraaf[] {
    return [...this.extractChildNodes2([element], new RichContentDoc()).paragrafen];
  }

  private extractChildNodes2(elements: NodeList | Node[], doc: RichContentDoc): RichContentDoc {

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];

      switch (element.localName) {
        case 'p':

          doc.finishAlinea();

          this.extractChildNodes2(element.childNodes, doc);

          let marginBottom = (element as HTMLElement).style.marginBottom;
          const hasMargin = marginBottom !== '0px';
          if (hasMargin || doc.endsWithEmptyAlinea()) {
            doc.finishParagraaf();
          }
          break;

        case 'br':
          doc.addBreak();
          break;

        case 'img':
          doc.addContent(...this.parseImg(element));
          break;

        case 'a':
          doc.addContent(...this.parseA(element));
          break;

        case undefined:
          doc.addContent(...this.parseText(element));
          break;

        default:
          this.extractChildNodes2(element.childNodes, doc);
      }
    }

    return doc;
  }

  private parseImg(element: Node): RichContent[] {
    const src = element.attributes.getNamedItem('src').value;
    return [new Afbeelding(src)];
  }

  private parseA(element: Node): RichContent[] {
    const href = element.attributes.getNamedItem('href').value;
    return [new Link(href, this.textContent(element))];
  }

  private parseText(element: Node): RichContent[] {
    const textContent = this.textContent(element);
    return textContent ? [new PlainText(this.textContent(element))] : [];
  }

  private textContent(element: Node): string {
    return element.textContent.trim();
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
