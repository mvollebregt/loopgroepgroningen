import {Action} from '@ngrx/store';
import {Evenement} from '../../api';

export enum AgendaActionType {
  LaadEvenementen = '[Agenda] Laad Evenementen',
  LaadEvenementenSucces = '[Agenda] Laad Evenementen succes',
  LaadEvenementenFout = '[Agenda] Laad Evenementen fout'
}

export class LaadAgendaEvenementen implements Action {
  readonly type = AgendaActionType.LaadEvenementen;
}

export class LaadAgendaEvenementenSucces implements Action {
  readonly type = AgendaActionType.LaadEvenementenSucces;

  constructor(public evenementen: Evenement[]) {
  }
}

export class LaadAgendaEvenementenFout implements Action {
  readonly type = AgendaActionType.LaadEvenementenFout;

  constructor(public fout: any) {
  }
}

export type AgendaAction =
  | LaadAgendaEvenementen
  | LaadAgendaEvenementenSucces
  | LaadAgendaEvenementenFout;
