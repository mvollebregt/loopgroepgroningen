type Fout = any; // TODO: later specificeren

export interface AanroepStatus {
  bezig: boolean;
  fouten: Fout[];
}

export namespace AanroepStatus {
  export const bezig = {bezig: true, fouten: []};
  export const succes = {bezig: false, fouten: []};

  export function fout(...fouten: Fout[]) {
    return {bezig: false, fouten};
  }
}
