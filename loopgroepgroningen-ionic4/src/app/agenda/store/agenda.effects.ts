import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AgendaActionType,
  HerstelAgendaOpgeslagenStateFout,
  HerstelAgendaOpgeslagenStateSucces,
  LaadAgendaEvenementdetails,
  LaadAgendaEvenementdetailsFout,
  LaadAgendaEvenementdetailsSucces,
  LaadAgendaEvenementenFout,
  LaadAgendaEvenementenSucces
} from './agenda.action';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {AgendaClient} from '../services/agenda.client';
import {of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AgendaState, getAgendaState} from './agenda.state';
import {AgendaOpslagService} from '../services/agenda-opslag.service';

@Injectable()
export class AgendaEffects {

  constructor(
    private actions: Actions,
    private store: Store<AgendaState>,
    private agendaOpslagService: AgendaOpslagService,
    private agendaClient: AgendaClient,
  ) {
  }

  @Effect()
  herstelOpgeslagenState = this.actions.pipe(
    ofType(AgendaActionType.HerstelOpgeslagenState),
    exhaustMap(() => this.agendaOpslagService.getOpgeslagenAgenda()),
    map(agenda => agenda
      ? new HerstelAgendaOpgeslagenStateSucces(agenda)
      : new HerstelAgendaOpgeslagenStateFout({melding: 'Nog niets opgeslagen'})),
    catchError(fout => of(new HerstelAgendaOpgeslagenStateFout(fout)))
  );

  @Effect({dispatch: false})
  bewaarOpgeslagenState = this.actions.pipe(
    ofType(
      AgendaActionType.LaadEvenementenSucces,
      AgendaActionType.LaadEvenementdetailsSucces
    ),
    withLatestFrom(this.store.pipe(select(getAgendaState))),
    map(([_, state]) => this.agendaOpslagService.setOpgeslagenAgenda(state))
  );


  @Effect()
  laadEvenementen = this.actions.pipe(
    ofType(AgendaActionType.LaadEvenementen),
    exhaustMap(() => this.agendaClient.getAgenda()),
    map(evenementen => new LaadAgendaEvenementenSucces(evenementen)),
    catchError(fout => of(new LaadAgendaEvenementenFout(fout)))
  );

  @Effect()
  laadEvenementdetails = this.actions.pipe(
    ofType(AgendaActionType.LaadEvenementdetails),
    exhaustMap((action: LaadAgendaEvenementdetails) => this.agendaClient.getEvenement(action.id).pipe(
      map(evenement => new LaadAgendaEvenementdetailsSucces(action.id, evenement)),
      catchError(fout => of(new LaadAgendaEvenementdetailsFout(action.id, fout)))))
  );

}
