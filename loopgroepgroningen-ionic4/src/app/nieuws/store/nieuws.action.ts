import {Action} from '@ngrx/store';
import {NieuwsState} from './nieuws.state';
import {Nieuwsbericht} from '../../../../../loopgroepgroningen-backend/functions/src/api/laatste-nieuws';

export enum NieuwsActionType {
  HerstelOpgeslagenState = '[Nieuws] Herstel opgeslagen state',
  HerstelOpgeslagenStateSucces = '[Nieuws] Herstel opgeslagen state succes',
  HerstelOpgeslagenStateFout = '[Nieuws] Herstel opgeslagen state fout',
  LaadOudereBerichten = '[Nieuws] Laad oudere berichten',
  LaadOudereBerichtenSucces = '[Nieuws] Laad oudere berichten succes',
  LaadOudereBerichtenFout = '[Nieuws] Laad oudere berichten fout'
}

export class HerstelNieuwsOpgeslagenState implements Action {
  readonly type = NieuwsActionType.HerstelOpgeslagenState;
}

export class HerstelNieuwsOpgeslagenStateSucces implements Action {
  readonly type = NieuwsActionType.HerstelOpgeslagenStateSucces;

  constructor(public nieuwsState: Partial<NieuwsState>) {
  }
}

export class HerstelNieuwsOpgeslagenStateFout implements Action {
  readonly type = NieuwsActionType.HerstelOpgeslagenStateFout;

  constructor(public fout: any) {
  }
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

export type NieuwsAction =
  | HerstelNieuwsOpgeslagenState
  | HerstelNieuwsOpgeslagenStateSucces
  | HerstelNieuwsOpgeslagenStateFout
  | LaadOudereNieuwsBerichten
  | LaadOudereNieuwsBerichtenFout
  | LaadOudereNieuwsBerichtenSucces;
