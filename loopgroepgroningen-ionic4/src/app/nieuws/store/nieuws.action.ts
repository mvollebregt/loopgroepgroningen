import {Action} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';

export enum NieuwsActionType {
  LaadOudereBerichten = '[Nieuws] Laad oudere berichten',
  LaadOudereBerichtenSucces = '[Nieuws] Laad oudere berichten succes',
  LaadOudereBerichtenFout = '[Nieuws] Laad oudere berichten fout'
}

export class LaadOudereNieuwsBerichten implements Action {
  readonly type = NieuwsActionType.LaadOudereBerichten;
}

export class LaadOudereNieuwsBerichtenSucces implements Action {
  readonly type = NieuwsActionType.LaadOudereBerichtenSucces;

  constructor(public berichten: Nieuwsbericht[]) {
  }
}

export class LaadOudereNieuwsBerichtenFout implements Action {
  readonly type = NieuwsActionType.LaadOudereBerichtenFout;

  constructor(public fout: any) {
  }
}


// action types
export type NieuwsAction =
  | LaadOudereNieuwsBerichten
  | LaadOudereNieuwsBerichtenFout
  | LaadOudereNieuwsBerichtenSucces;
