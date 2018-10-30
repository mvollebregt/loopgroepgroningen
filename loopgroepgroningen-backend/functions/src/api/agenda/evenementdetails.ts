import {Paragraaf} from '../rich-content';
import {Bericht} from '../shared';

export interface Evenementdetails {

  categorie: string;
  omschrijving: Paragraaf[];
  deelname: boolean;
  deelnemers: string[];
  reacties: Bericht[];

}
