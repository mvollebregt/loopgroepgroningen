import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AgendaActionType,
  LaadAgendaEvenementdetails,
  LaadAgendaEvenementdetailsFout,
  LaadAgendaEvenementdetailsSucces,
  LaadAgendaEvenementenFout,
  LaadAgendaEvenementenSucces
} from './agenda.action';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {AgendaClient} from '../services/agenda.client';
import {of} from 'rxjs';

@Injectable()
export class AgendaEffects {

  constructor(
    private actions: Actions,
    private agendaClient: AgendaClient,
  ) {
  }

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
