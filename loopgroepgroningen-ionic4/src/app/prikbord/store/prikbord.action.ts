import {Action} from '@ngrx/store';
import {Bericht} from '../../api';

export enum PrikbordActionType {
  LaadOudereBerichten = '[Prikbord] Laad oudere berichten',
  LaadOudereBerichtenSucces = '[Prikbord] Laad oudere berichten succes',
  LaadOudereBerichtenFout = '[Prikbord] Laad oudere berichten fout',
  TypBericht = '[Prikbord] Typ bericht',
  VerstuurBericht = '[Prikbord] Verstuur bericht',
  VerstuurBerichtSucces = '[Prikbord] Verstuur bericht succes',
  VerstuurBerichtFout = '[Prikbord] Verstuur bericht fout'
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

  constructor(public fout: any) {
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

  constructor(public fout: any) {

  }
}

export type PrikbordAction =
  | LaadOuderePrikbordBerichten
  | LaadOuderePrikbordBerichtenSucces
  | LaadOuderePrikbordBerichtenFout
  | TypPrikbordBericht
  | VerstuurPrikbordBericht
  | VerstuurPrikbordBerichtSucces
  | VerstuurPrikbordBerichtFout
