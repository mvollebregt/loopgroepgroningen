import {Fout} from './fout';
import {Aanroepfase} from './aanroepfase';

export interface Aanroepstatus {
  fase: Aanroepfase;
  fout?: Fout;
}

export namespace Aanroepstatus {
  export const nogNietGestart: Aanroepstatus = {fase: Aanroepfase.nogNietGestart};
  export const bezig: Aanroepstatus = {fase: Aanroepfase.bezig};
  export const uitgevoerdMetSucces: Aanroepstatus = {fase: Aanroepfase.uitgevoerd};
  export const geannuleerd: Aanroepstatus = {fase: Aanroepfase.geannuleerd};


  export function uitgevoerdMetFout(melding: string): Aanroepstatus;
  export function uitgevoerdMetFout(fout: Fout): Aanroepstatus;
  export function uitgevoerdMetFout(meldingOfFout: string | Fout): Aanroepstatus {
    const fout = typeof meldingOfFout === 'string' ? {melding: meldingOfFout} : meldingOfFout;
    return {fase: Aanroepfase.uitgevoerd, fout};
  }
}
