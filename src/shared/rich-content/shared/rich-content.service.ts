import {Injectable} from '@angular/core';
import {Afbeelding, Link, Paragraaf, PlainText, RichContent} from './rich-content';

@Injectable()
export class RichContentService {

  extractRichContent(element: Node): RichContent[] {
    const extractedChildren = this.extractChildNodes(element);
    switch (element.localName) {
      case 'p':
        return extractedChildren.length ? [new Paragraaf(extractedChildren)] : [];
      case 'img':
        const src = element.attributes.getNamedItem('src').value;
        return [new Afbeelding(src), ...extractedChildren];
      case 'a':
        const href = element.attributes.getNamedItem('href').value;
        return [new Link(href, this.textContent(element))];
      case undefined:
        const textContent = this.textContent(element);
        return textContent ? [new PlainText(this.textContent(element))] : [];
      default:
        return extractedChildren;
    }
  }

  samenvatting(content: RichContent[], length: number): string {
    let text = '';
    for (let child of content) {
      switch (child.type) {
        case 'text':
          text += (child as PlainText).tekst + ' ';
          break;
        case 'paragraaf':
          text += this.samenvatting((child as Paragraaf).children, length);
          break;
      }
      if (text.length >= length) {
        return text;
      }
    }
    return text;
  }

  private extractChildNodes(element: Node): RichContent[] {
    let children: RichContent[] = [];
    for (let i = 0; i < element.childNodes.length; i++) {
      children.push(...this.extractRichContent(element.childNodes[i]));
    }
    return children;
  }

  private textContent(element: Node): string {
    return element.textContent.trim();
  }
}
