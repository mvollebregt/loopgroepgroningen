import {Action} from '@ngrx/store';
import {Evenement} from '../../api';
import {AgendaState} from './agenda.state';
import {Fout} from '../../core/backend/models/fout';

export enum AgendaActionType {
  HerstelOpgeslagenState = '[Agenda] Herstel opgeslagen state',
  HerstelOpgeslagenStateSucces = '[Agenda] Herstel opgeslagen state succes',
  HerstelOpgeslagenStateFout = '[Agenda] Herstel opgeslagen state fout',
  LaadEvenementen = '[Agenda] Laad Evenementen',
  LaadEvenementenSucces = '[Agenda] Laad Evenementen succes',
  LaadEvenementenFout = '[Agenda] Laad Evenementen fout',
  LaadEvenementdetails = '[Agenda] Laad Evenementdetails',
  LaadEvenementdetailsSucces = '[Agenda] Laad Evenementdetails succes',
  LaadEvenementdetailsFout = '[Agenda] Laad Evenementdetails fout'
}

export class HerstelAgendaOpgeslagenState implements Action {
  readonly type = AgendaActionType.HerstelOpgeslagenState;
}

export class HerstelAgendaOpgeslagenStateSucces implements Action {
  readonly type = AgendaActionType.HerstelOpgeslagenStateSucces;

  constructor(public agendaState: Partial<AgendaState>) {
  }
}

export class HerstelAgendaOpgeslagenStateFout implements Action {
  readonly type = AgendaActionType.HerstelOpgeslagenStateFout;

  constructor(public fout: Fout) {
  }
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

  constructor(public fout: Fout) {
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

  constructor(public id: string, public fout: Fout) {
  }
}

export type AgendaAction =
  | HerstelAgendaOpgeslagenState
  | HerstelAgendaOpgeslagenStateSucces
  | HerstelAgendaOpgeslagenStateFout
  | LaadAgendaEvenementen
  | LaadAgendaEvenementenSucces
  | LaadAgendaEvenementenFout
  | LaadAgendaEvenementdetails
  | LaadAgendaEvenementdetailsSucces
  | LaadAgendaEvenementdetailsFout;
