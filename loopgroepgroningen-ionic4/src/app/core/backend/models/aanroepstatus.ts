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

  export function uitgevoerdMetFout(meldingOfFout: string | Fout): Aanroepstatus {
    const fout = typeof meldingOfFout === 'string' ? {melding: meldingOfFout} : meldingOfFout;
    return {fase: Aanroepfase.uitgevoerd, fout};
  }
}
