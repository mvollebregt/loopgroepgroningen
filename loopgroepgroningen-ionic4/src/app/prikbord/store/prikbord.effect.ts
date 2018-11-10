import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {PrikbordClient} from '../services/prikbord.client';
import {select, Store} from '@ngrx/store';
import {getPrikbordBerichten, PrikbordState} from './prikbord.state';
import {
  LaadOuderePrikbordBerichtenFout,
  LaadOuderePrikbordBerichtenSucces,
  PrikbordActionType
} from './prikbord.action';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class PrikbordEffects {

  constructor(
    private actions: Actions,
    private prikbordClient: PrikbordClient,
    private store: Store<PrikbordState>
  ) {
  }

  @Effect()
  LaadOudereBerichten = this.actions.pipe(
    ofType(PrikbordActionType.LaadOudereBerichten),
    withLatestFrom(this.store.pipe(select(getPrikbordBerichten))),
    exhaustMap(([_, berichten]) => this.prikbordClient.getBerichten(berichten && berichten.length || undefined)),
    map(resultaat => new LaadOuderePrikbordBerichtenSucces(resultaat)),
    catchError(fout => of(new LaadOuderePrikbordBerichtenFout(fout)))
  );

}
