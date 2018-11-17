import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TrainingsschemaClient} from '../services/trainingsschema.client';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {LaadTrainingsschemaFout, LaadTrainingsschemaSucces, TrainingsschemaActionType} from './trainingsschema.action';
import {of} from 'rxjs';

@Injectable()
export class TrainingsschemaEffects {

  constructor(
    private actions: Actions,
    private trainingsschemaClient: TrainingsschemaClient,
  ) {
  }

  @Effect()
  laadTrainingsschema = this.actions.pipe(
    ofType(TrainingsschemaActionType.LaadTrainingsschema),
    exhaustMap(() => this.trainingsschemaClient.haalTrainingsschemaOp()),
    map(evenementen => new LaadTrainingsschemaSucces(evenementen)),
    catchError(fout => of(new LaadTrainingsschemaFout(fout)))
  );
}
