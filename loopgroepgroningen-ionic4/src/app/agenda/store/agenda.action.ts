import {Action} from '@ngrx/store';
import {Evenement} from '../../api';

export enum AgendaActionType {
  LaadEvenementen = '[Agenda] Laad Evenementen',
  LaadEvenementenSucces = '[Agenda] Laad Evenementen succes',
  LaadEvenementenFout = '[Agenda] Laad Evenementen fout',
  LaadEvenementdetails = '[Agenda] Laad Evenementdetails',
  LaadEvenementdetailsSucces = '[Agenda] Laad Evenementdetails succes',
  LaadEvenementdetailsFout = '[Agenda] Laad Evenementdetails fout'
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

export class LaadAgendaEvenementdetails implements Action {
  readonly type = AgendaActionType.LaadEvenementdetails;

  constructor(public id: string) {
  }
}

export class LaadAgendaEvenementdetailsSucces implements Action {
  readonly type = AgendaActionType.LaadEvenementdetailsSucces;

  constructor(public id: string, public evenement: Evenement) {
  }
}

export class LaadAgendaEvenementdetailsFout implements Action {
  readonly type = AgendaActionType.LaadEvenementdetailsFout;

  constructor(public id: string, public fout: any) {
  }
}

export type AgendaAction =
  | LaadAgendaEvenementen
  | LaadAgendaEvenementenSucces
  | LaadAgendaEvenementenFout
  | LaadAgendaEvenementdetails
  | LaadAgendaEvenementdetailsSucces
  | LaadAgendaEvenementdetailsFout
