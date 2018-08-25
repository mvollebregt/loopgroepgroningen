import {Paragraaf} from './rich-content';

export interface Nieuwsbericht {

  volgnummer: number;
  titel: string;
  datum?: string;
  content: Paragraaf[];
  thumbnail: string;
  samenvatting: string;

}
