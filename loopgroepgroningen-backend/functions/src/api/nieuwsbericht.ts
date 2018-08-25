import {Paragraaf} from '../../../shared/rich-content/shared/paragraaf';

export interface Nieuwsbericht {

  volgnummer: number;
  titel: string;
  datum?: string;
  content: Paragraaf[];
  thumbnail: string;
  samenvatting: string;

}
