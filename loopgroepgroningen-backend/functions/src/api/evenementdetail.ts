import {Paragraaf} from './rich-content';
import {Bericht} from './bericht';

export interface Evenementdetail {

  start: string;
  einde: string;
  naam: string;
  categorie: string;
  omschrijving: Paragraaf[];
  deelname: boolean;
  deelnemers: string[];
  reacties: Bericht[];

}
