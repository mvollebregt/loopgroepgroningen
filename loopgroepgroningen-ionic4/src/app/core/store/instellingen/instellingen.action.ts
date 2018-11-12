import {Action} from '@ngrx/store';

export enum InstellingenActionType {
  ZetGroep = '[Instellingen] Zet Groep'
}

export class ZetInstellingenGroep implements Action {
  readonly type = InstellingenActionType.ZetGroep;

  constructor(public groep: 'A' | 'B' | 'C') {
  }
}

export type InstellingenAction =
  | ZetInstellingenGroep;
