import {Paragraaf} from './rich-content';

export interface Bericht {

  auteur: string;
  tijdstip: string;
  berichttekst: Paragraaf[];

}
