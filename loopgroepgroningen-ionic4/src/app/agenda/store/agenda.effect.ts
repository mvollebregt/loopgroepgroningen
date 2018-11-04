import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AgendaActionType, LaadAgendaEvenementenFout, LaadAgendaEvenementenSucces} from './agenda.action';
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

}
