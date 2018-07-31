import {DocumentBuilder} from './document-builder';
import {Afbeelding, Link, PlainText, RichContent} from '../models/rich-content';

export class RichContentBuilder {

  private doc = new DocumentBuilder();

  extractRichContent(elements: NodeList | Node[]): void {

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      switch (element.localName) {

        case 'p':
          this.extractParagraph(element);
          break;

        case 'br':
          this.doc.addBreak();
          break;

        case 'img':
          this.doc.addContent(...this.parseImg(element));
          break;

        case 'a':
          this.doc.addContent(...this.parseA(element));
          break;

        case undefined:
          this.doc.addContent(...this.parseText(element));
          break;

        default:
          this.extractRichContent(element.childNodes);
      }
    }
  }

  build() {
    return this.doc.build();
  }

  private extractParagraph(element: Node): void {

    this.doc.finishAlinea();

    this.extractRichContent(element.childNodes);

    const marginBottom = (element as HTMLElement).style.marginBottom;
    const hasMargin = marginBottom !== '0px';
    if (hasMargin || this.doc.endsWithEmptyAlinea()) {
      this.doc.finishParagraaf();
    }
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

}
