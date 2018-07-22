export enum RichContentType {
  AFBEELDING = 'afbeelding',
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

export class Paragraaf implements RichContent {
  type = RichContentType.PARAGRAAF;

  constructor(public tekst: string) {
  }
}
