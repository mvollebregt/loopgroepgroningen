import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {TrainingsschemaClient} from '../services/trainingsschema.client';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getTrainingsschemaState, TrainingsschemaState} from './trainingsschema.state';
import {
  HerstelTrainingsschemaOpgeslagenStateFout,
  HerstelTrainingsschemaOpgeslagenStateSucces,
  LaadTrainingsschemaFout,
  LaadTrainingsschemaSucces,
  TrainingsschemaActionType
} from './trainingsschema.action';
import {TrainingsschemaOpslagService} from '../services/trainingsschema-opslag.service';

@Injectable()
export class TrainingsschemaEffects {

  constructor(
    private actions: Actions,
    private store: Store<TrainingsschemaState>,
    private trainingsschemaOpslagService: TrainingsschemaOpslagService,
    private trainingsschemaClient: TrainingsschemaClient,
  ) {
  }

  @Effect()
  herstelOpgeslagenState = this.actions.pipe(
    ofType(TrainingsschemaActionType.HerstelOpgeslagenState),
    exhaustMap(() => this.trainingsschemaOpslagService.getOpgeslagenTrainingsschema()),
    map(trainingsschema => trainingsschema
      ? new HerstelTrainingsschemaOpgeslagenStateSucces(trainingsschema)
      : new HerstelTrainingsschemaOpgeslagenStateFout('Nog niets opgeslagen')),
    catchError(fout => of(new HerstelTrainingsschemaOpgeslagenStateFout(fout)))
  );

  @Effect({dispatch: false})
  bewaarOpgeslagenState = this.actions.pipe(
    ofType(TrainingsschemaActionType.LaadTrainingsschemaSucces),
    withLatestFrom(this.store.pipe(select(getTrainingsschemaState))),
    map(([_, state]) => this.trainingsschemaOpslagService.setOpgeslagenTrainingsschema(state))
  );

  @Effect()
  laadTrainingsschema = this.actions.pipe(
    ofType(TrainingsschemaActionType.LaadTrainingsschema),
    exhaustMap(() => this.trainingsschemaClient.haalTrainingsschemaOp()),
    map(evenementen => new LaadTrainingsschemaSucces(evenementen)),
    catchError(fout => of(new LaadTrainingsschemaFout(fout)))
  );
}
