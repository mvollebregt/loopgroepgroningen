import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {
  LOAD_MORE_NIEUWSBERICHTEN,
  LoadMoreNieuwsberichtenSuccess,
  LoadNieuwsberichtenFail
} from './nieuwsberichten.action';
import {NieuwsClient} from '../services/nieuws.client';
import {of} from 'rxjs';
import {getNieuwsberichtenState, NieuwsState} from './nieuws.reducers';
import {select, Store} from '@ngrx/store';

@Injectable()
export class NieuwsberichtenEffects {
  constructor(
    private actions: Actions,
    private nieuwsClient: NieuwsClient,
    private store: Store<NieuwsState>
  ) {
  }

  @Effect()
  loadMoreNieuwsberichten = this.actions
    .pipe(
      ofType(LOAD_MORE_NIEUWSBERICHTEN),
      withLatestFrom(this.store.pipe(select(getNieuwsberichtenState))),
      exhaustMap(([_, store]) =>
        this.nieuwsClient.getLaatsteNieuws(store.nieuwsberichten.length).pipe(
          map(nieuws => new LoadMoreNieuwsberichtenSuccess(nieuws)),
          catchError(error => {
            console.log(error);
            return of(new LoadNieuwsberichtenFail(error));
          })
        )
      ));

}
