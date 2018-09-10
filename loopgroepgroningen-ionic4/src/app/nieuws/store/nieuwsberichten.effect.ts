import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {LOAD_NIEUWSBERICHTEN, LoadNieuwsberichtenFail, LoadNieuwsberichtenSuccess} from './nieuwsberichten.action';
import {NieuwsClient} from '../services/nieuws.client';
import {of} from 'rxjs';

@Injectable()
export class NieuwsberichtenEffects {
  constructor(
    private actions: Actions,
    private nieuwsClient: NieuwsClient
  ) {
  }

  @Effect()
  loadNieuwsberichten = this.actions
    .pipe(
      ofType(LOAD_NIEUWSBERICHTEN),
      exhaustMap(() =>
        this.nieuwsClient.getLaatsteNieuws().pipe(
          map(nieuws => new LoadNieuwsberichtenSuccess(nieuws)),
          catchError(error => {
            console.log(error);
            return of(new LoadNieuwsberichtenFail(error));
          })
        )
      ));

}
