import {Paragraaf} from '../rich-content';

export interface Nieuwsbericht {

  href: string;
  titel: string;
  datum?: string;
  content: Paragraaf[];
  thumbnail: string;
  samenvatting: string;

}
