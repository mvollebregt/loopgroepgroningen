import {Paragraaf} from '../rich-content';

export interface Nieuwsbericht {

  id: string;
  titel: string;
  datum?: string;
  content: Paragraaf[];
  thumbnail: string;
  samenvatting: string;

}
