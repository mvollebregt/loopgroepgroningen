export enum RichContentType {
  AFBEELDING = 'afbeelding',
  LINK = 'link',
  PARAGRAAF = 'paragraaf'
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

  constructor(public href: string, public textContent: string) {
    console.log(href);
  }
}

export class Paragraaf implements RichContent {
  type = RichContentType.PARAGRAAF;

  constructor(public tekst: string) {
  }
}
