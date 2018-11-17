import {Action} from '@ngrx/store';
import {Trainingsschema} from '../../api';
import {TrainingsschemaState} from './trainingsschema.state';

export enum TrainingsschemaActionType {
  HerstelOpgeslagenState = '[Trainingsschema] Herstel opgeslagen state',
  HerstelOpgeslagenStateSucces = '[Trainingsschema] Herstel opgeslagen state succes',
  HerstelOpgeslagenStateFout = '[Trainingsschema] Herstel opgeslagen state fout',
  LaadTrainingsschema = '[Trainingsschema] Laad Trainingsschema',
  LaadTrainingsschemaSucces = '[Trainingsschema] Laad Trainingsschema succes',
  LaadTrainingsschemaFout = '[Trainingsschema] Laad Trainingsschema fout',
}

export class HerstelTrainingsschemaOpgeslagenState implements Action {
  readonly type = TrainingsschemaActionType.HerstelOpgeslagenState;
}

export class HerstelTrainingsschemaOpgeslagenStateSucces implements Action {
  readonly type = TrainingsschemaActionType.HerstelOpgeslagenStateSucces;

  constructor(public trainingsschemaState: Partial<TrainingsschemaState>) {
  }
}

export class HerstelTrainingsschemaOpgeslagenStateFout implements Action {
  readonly type = TrainingsschemaActionType.HerstelOpgeslagenStateFout;

  constructor(public fout: any) {
  }
}

export class LaadTrainingsschema implements Action {
  readonly type = TrainingsschemaActionType.LaadTrainingsschema;
}

export class LaadTrainingsschemaSucces implements Action {
  readonly type = TrainingsschemaActionType.LaadTrainingsschemaSucces;

  constructor(public trainingsschema: Trainingsschema) {
  }
}

export class LaadTrainingsschemaFout implements Action {
  readonly type = TrainingsschemaActionType.LaadTrainingsschemaFout;

  constructor(public fout: any) {
  }
}

export type TrainingsschemaAction =
  | HerstelTrainingsschemaOpgeslagenState
  | HerstelTrainingsschemaOpgeslagenStateSucces
  | HerstelTrainingsschemaOpgeslagenStateFout
  | LaadTrainingsschema
  | LaadTrainingsschemaSucces
  | LaadTrainingsschemaFout;
