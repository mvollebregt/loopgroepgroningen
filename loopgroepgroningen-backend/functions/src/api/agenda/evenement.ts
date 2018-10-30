import {Evenementdetails} from './evenementdetails';

export interface Evenement {

  id: string;
  start: string;
  einde: string;
  naam: string;
  details?: Evenementdetails;

}
