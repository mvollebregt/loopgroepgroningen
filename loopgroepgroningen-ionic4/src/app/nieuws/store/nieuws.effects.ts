import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {NieuwsClient} from '../services/nieuws.client';
import {of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {LaadOudereNieuwsBerichtenFout, LaadOudereNieuwsBerichtenSucces, NieuwsActionType} from './nieuws.action';
import {getNieuwsberichten, NieuwsState} from './nieuws.state';

@Injectable()
export class NieuwsEffects {
  constructor(
    private actions: Actions,
    private nieuwsClient: NieuwsClient,
    private store: Store<NieuwsState>
  ) {
  }

  @Effect()
  laadOudereBerichten = this.actions
    .pipe(
      ofType(NieuwsActionType.LaadOudereBerichten),
      withLatestFrom(this.store.pipe(select(getNieuwsberichten))),
      exhaustMap(([_, nieuwsberichten]) => this.nieuwsClient.getLaatsteNieuws(nieuwsberichten ? nieuwsberichten.length : 0)),
      map(nieuws => new LaadOudereNieuwsBerichtenSucces(nieuws)),
      catchError(fout => of(new LaadOudereNieuwsBerichtenFout(fout)))
    );

}
