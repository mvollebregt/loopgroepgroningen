import {Paragraaf} from './rich-content/paragraaf';

export interface Bericht {

  auteur: string;
  tijdstip: string;
  berichttekst: Paragraaf[];

}
