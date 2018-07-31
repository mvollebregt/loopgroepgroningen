import {Paragraaf} from '../../rich-content/models/paragraaf';

export interface Bericht {

  auteur: string;
  tijdstip: string;
  berichttekst: Paragraaf[];

}
