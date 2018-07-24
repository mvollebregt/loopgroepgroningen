import {RichContent} from './rich-content';

export class Alinea {

  content: RichContent[];

  constructor(content: RichContent[] = []) {
    this.content = content;
  }

  addContent(...extraContent: RichContent[]): void {
    this.content.push(...extraContent);
  }
}
