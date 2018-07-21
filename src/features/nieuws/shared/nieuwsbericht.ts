import {RichContent} from '../../../shared/rich-content/shared/rich-content';

export interface Nieuwsbericht {

  volgnummer: number;
  titel: string;
  datum: string;
  content: RichContent;
  plaatje: string;
  samenvatting: string;

}
