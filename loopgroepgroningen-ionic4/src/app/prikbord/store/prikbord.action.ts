import {Action} from '@ngrx/store';
import {Bericht} from '../../api';
import {PrikbordState} from './prikbord.state';
import {Fout} from '../../core/backend/models/fout';

export enum PrikbordActionType {
  HerstelOpgeslagenState = '[Prikbord] Herstel opgeslagen state',
  HerstelOpgeslagenStateSucces = '[Prikbord] Herstel opgeslagen state succes',
  HerstelOpgeslagenStateFout = '[Prikbord] Herstel opgeslagen state fout',
  CheckNieuweBerichten = '[Prikbord] Check nieuwe berichten',
  CheckNieuweBerichtenSucces = '[Prikbord] Check nieuwe berichten succes',
  CheckNieuweBerichtenFout = '[Prikbord] Check nieuwe berichten fout',
  LaadOudereBerichten = '[Prikbord] Laad oudere berichten',
  LaadOudereBerichtenSucces = '[Prikbord] Laad oudere berichten succes',
  LaadOudereBerichtenFout = '[Prikbord] Laad oudere berichten fout',
  TypBericht = '[Prikbord] Typ bericht',
  VerstuurBericht = '[Prikbord] Verstuur bericht',
  VerstuurBerichtSucces = '[Prikbord] Verstuur bericht succes',
  VerstuurBerichtFout = '[Prikbord] Verstuur bericht fout'
}

export class HerstelPrikbordOpgeslagenState implements Action {
  readonly type = PrikbordActionType.HerstelOpgeslagenState;
}

export class HerstelPrikbordOpgeslagenStateSucces implements Action {
  readonly type = PrikbordActionType.HerstelOpgeslagenStateSucces;

  constructor(public prikbordState: Partial<PrikbordState>) {
  }
}

export class HerstelPrikbordOpgeslagenStateFout implements Action {
  readonly type = PrikbordActionType.HerstelOpgeslagenStateFout;

  constructor(public fout: Fout) {
  }
}

export class CheckNieuwePrikbordBerichten implements Action {
  readonly type = PrikbordActionType.CheckNieuweBerichten;
}

export class CheckNieuwePrikbordBerichtenSucces implements Action {
  readonly type = PrikbordActionType.CheckNieuweBerichtenSucces;

  constructor(public berichten: Bericht[]) {
  }
}

export class CheckNieuwePrikbordBerichtenFout implements Action {
  readonly type = PrikbordActionType.CheckNieuweBerichtenFout;

  constructor(public fout: Fout) {
  }
}

export class LaadOuderePrikbordBerichten implements Action {
  readonly type = PrikbordActionType.LaadOudereBerichten;
}

export class LaadOuderePrikbordBerichtenSucces implements Action {
  readonly type = PrikbordActionType.LaadOudereBerichtenSucces;

  constructor(public berichten: Bericht[]) {
  }
}

export class LaadOuderePrikbordBerichtenFout implements Action {
  readonly type = PrikbordActionType.LaadOudereBerichtenFout;

  constructor(public fout: Fout) {
  }
}

export class TypPrikbordBericht implements Action {
  readonly type = PrikbordActionType.TypBericht;

  constructor(public bericht: string) {
  }
}

export class VerstuurPrikbordBericht implements Action {
  readonly type = PrikbordActionType.VerstuurBericht;
}

export class VerstuurPrikbordBerichtSucces implements Action {
  readonly type = PrikbordActionType.VerstuurBerichtSucces;
}

export class VerstuurPrikbordBerichtFout implements Action {
  readonly type = PrikbordActionType.VerstuurBerichtFout;

  constructor(public fout: Fout) {

  }
}

export type PrikbordAction =
  | HerstelPrikbordOpgeslagenState
  | HerstelPrikbordOpgeslagenStateSucces
  | HerstelPrikbordOpgeslagenStateFout
  | CheckNieuwePrikbordBerichten
  | CheckNieuwePrikbordBerichtenSucces
  | CheckNieuwePrikbordBerichtenFout
  | LaadOuderePrikbordBerichten
  | LaadOuderePrikbordBerichtenSucces
  | LaadOuderePrikbordBerichtenFout
  | TypPrikbordBericht
  | VerstuurPrikbordBericht
  | VerstuurPrikbordBerichtSucces
  | VerstuurPrikbordBerichtFout;
