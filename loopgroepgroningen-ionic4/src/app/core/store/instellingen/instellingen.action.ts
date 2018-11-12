import {Action} from '@ngrx/store';
import {InstellingenState} from './instellingen.state';

export enum InstellingenActionType {
  HerstelOpgeslagenState = '[Instellingen] Herstel opgeslagen state',
  HerstelOpgeslagenStateSucces = '[Instellingen] Herstel opgeslagen state succes',
  HerstelOpgeslagenStateFout = '[Instellingen] Herstel opgeslagen state fout',
  ZetGroep = '[Instellingen] Zet Groep'
}

export class HerstelInstellingenOpgeslagenState implements Action {
  readonly type = InstellingenActionType.HerstelOpgeslagenState;
}

export class HerstelInstellingenOpgeslagenStateSucces implements Action {
  readonly type = InstellingenActionType.HerstelOpgeslagenStateSucces;

  constructor(public instellingenState: InstellingenState) {
  }
}

export class HerstelInstellingenOpgeslagenStateFout implements Action {
  readonly type = InstellingenActionType.HerstelOpgeslagenStateFout;

  constructor(public fout: any) {
  }
}

export class ZetInstellingenGroep implements Action {
  readonly type = InstellingenActionType.ZetGroep;

  constructor(public groep: 'A' | 'B' | 'C') {
  }
}

export type InstellingenAction =
  | HerstelInstellingenOpgeslagenState
  | HerstelInstellingenOpgeslagenStateSucces
  | HerstelInstellingenOpgeslagenStateFout
  | ZetInstellingenGroep;
