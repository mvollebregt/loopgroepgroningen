import {Injectable} from '@angular/core';

import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {LOAD_NIEUWSBERICHTEN, LoadNieuwsberichtenFail, LoadNieuwsberichtenSuccess} from './nieuwsberichten.action';
import {NieuwsClient} from '../shared/nieuws.client';

@Injectable()
export class NieuwsberichtenEffects {
  constructor(
    private actions: Actions,
    private nieuwsClient: NieuwsClient
  ) {
  }

  @Effect()
  loadNieuwsberichten = this.actions
    .ofType(LOAD_NIEUWSBERICHTEN)
    .pipe(
      exhaustMap(() =>
        this.nieuwsClient.haalNieuwsberichtenOp().pipe(
          map(nieuwsberichten => new LoadNieuwsberichtenSuccess(nieuwsberichten)),
          catchError(error => {
            console.log(error);
            return of(new LoadNieuwsberichtenFail(error));
          })
        )
      ));

}
