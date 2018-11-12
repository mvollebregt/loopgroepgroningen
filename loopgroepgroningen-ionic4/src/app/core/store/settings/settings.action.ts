import {Action} from '@ngrx/store';

export enum SettingsActionType {
  ZetGroep = '[Settings] Zet Groep'
}

export class ZetSettingsGroep implements Action {
  readonly type = SettingsActionType.ZetGroep;

  constructor(public groep: 'A' | 'B' | 'C') {
  }
}

export type SettingsAction =
  | ZetSettingsGroep;
