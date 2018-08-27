import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
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
    .ofType(LOAD_NIEUWSBERICHTEN)
    .pipe(
      exhaustMap(() =>
        this.nieuwsClient.getLaatsteNieuws().pipe(
          map(({nieuws, meldingen}) => new LoadNieuwsberichtenSuccess(nieuws)),
          catchError(error => {
            console.log(error);
            return of(new LoadNieuwsberichtenFail(error));
          })
        )
      ));

}
