import {Aanroepstatus} from '../../backend/models/aanroepstatus';

export interface InstellingenState {
  laadstatus: Aanroepstatus
  groep: 'A' | 'B' | 'C';
}

