import {DocumentBuilder} from './document-builder';
import {Node, NodeList} from 'jsdom';
import {Afbeelding, Link, PlainText, RichContent} from '../api';

export class RichContentBuilder {

  private doc = new DocumentBuilder();

  extractRichContent(elements: NodeList | Node[]): void {

    for (const element of elements) {

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

    const marginBottom = element.style.marginBottom;
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
    return textContent ? this.recognizeLinksInText(textContent) : [];
  }

  private recognizeLinksInText(textContent): RichContent[] {
    const result: RichContent[] = [];
    const linkRegEx = /\b(http:\/\/|https:\/\/|www\.)([A-za-z0-9-]+)+([@-Za-z!#-;=?])+\b/g;
    let index = 0;
    let match = linkRegEx.exec(textContent);
    while (match) {
      result.push(...this.plainTextIfNotEmpty(textContent.substring(index, match.index)));
      result.push(new Link(this.makeLink(match[0]), match[0]));
      index = match.index + match[0].length;
      match = linkRegEx.exec(textContent);
    }
    result.push(...this.plainTextIfNotEmpty(textContent.substring(index)));
    return result;
  }

  private plainTextIfNotEmpty(text: string): PlainText[] {
    return text ? [new PlainText(text)] : [];
  }

  private makeLink(text: string): string {
    return text.startsWith('http') ? text : `http://${text}`;
  }

  private textContent(element: Node): string {
    return element.textContent.trim();
  }
}
