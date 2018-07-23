import {Injectable} from '@angular/core';
import {Afbeelding, Link, Paragraaf, RichContent} from './rich-content';

@Injectable()
export class RichContentService {

  extractRichContent(element: Node): RichContent[] {
    let children: RichContent[] = [];
    switch (element.localName) {
      case 'p':
        children.push(new Paragraaf(element.textContent));
        break;
      case 'img':
        const src = element.attributes.getNamedItem('src').value;
        children.push(new Afbeelding(src));
        break;
      case 'a':
        console.log('a');
        const href = element.attributes.getNamedItem('href').value;
        const textContent = element.textContent;
        children.push(new Link(href, textContent));
    }
    for (let i = 0; i < element.childNodes.length; i++) {
      children.push(...this.extractRichContent(element.childNodes[i]));
    }
    return children;
  }
}
