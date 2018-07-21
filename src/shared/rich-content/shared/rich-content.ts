export enum RichContentType {
  CONTAINER = 'container',
  PARAGRAAF = 'paragraaf'
}

export interface RichContent {
  type: RichContentType;
}

export class RichContentContainer implements RichContent {
  type = RichContentType.CONTAINER;

  constructor(public children: RichContent[]) {
  }
}

export class Paragraaf implements RichContent {
  type = RichContentType.PARAGRAAF;

  constructor(public tekst: string) {
  }
}
