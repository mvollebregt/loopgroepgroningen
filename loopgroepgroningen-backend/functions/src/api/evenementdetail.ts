import {Bericht} from '../../core/bericht';
import {Paragraaf} from '../../shared/rich-content/shared/paragraaf';

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
