export enum RichContentType {
  AFBEELDING = 'afbeelding',
  LINK = 'link',
  TEXT = 'text'
}

export interface RichContent {
  type: RichContentType;
}

export class Afbeelding implements RichContent {
  type = RichContentType.AFBEELDING;

  constructor(public src: string) {
  }
}

export class Link implements RichContent {
  type = RichContentType.LINK;

  constructor(public href: string, public textContent: string = href) {
  }
}

export class PlainText implements RichContent {
  type = RichContentType.TEXT;

  constructor(public tekst: string) {
  }
}
