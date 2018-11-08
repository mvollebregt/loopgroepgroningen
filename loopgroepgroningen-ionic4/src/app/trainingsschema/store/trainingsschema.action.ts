import {Action} from '@ngrx/store';
import {Trainingsschema} from '../../api';

export enum TrainingsschemaActionType {
  LaadTrainingsschema = '[Trainingsschema] Laad Trainingsschema',
  LaadTrainingsschemaSucces = '[Trainingsschema] Laad Trainingsschema succes',
  LaadTrainingsschemaFout = '[Trainingsschema] Laad Trainingsschema fout',
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
  | LaadTrainingsschema
  | LaadTrainingsschemaSucces
  | LaadTrainingsschemaFout
