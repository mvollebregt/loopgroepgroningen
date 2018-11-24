import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {getNieuwsberichten, getNieuwsState, NieuwsState} from './nieuws.state';
import {NieuwsOpslagService} from '../services/nieuws-opslag.service';
import {NieuwsClient} from '../services/nieuws.client';
import {
  HerstelNieuwsOpgeslagenStateFout,
  HerstelNieuwsOpgeslagenStateSucces,
  LaadOudereNieuwsBerichtenFout,
  LaadOudereNieuwsBerichtenSucces,
  NieuwsActionType
} from './nieuws.action';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class NieuwsEffects {

  constructor(
    private actions: Actions,
    private store: Store<NieuwsState>,
    private nieuwsOpslagService: NieuwsOpslagService,
    private nieuwsClient: NieuwsClient,
  ) {
  }

  @Effect()
  herstelOpgeslagenState = this.actions.pipe(
    ofType(NieuwsActionType.HerstelOpgeslagenState),
    exhaustMap(() => this.nieuwsOpslagService.getOpgeslagenNieuws().pipe(
      map(nieuws => nieuws
        ? new HerstelNieuwsOpgeslagenStateSucces(nieuws)
        : new HerstelNieuwsOpgeslagenStateFout({error: ['Nog niets opgeslagen']})),
      catchError(fout => of(new HerstelNieuwsOpgeslagenStateFout(fout)))
    ))
  );

  @Effect({dispatch: false})
  bewaarOpgeslagenState = this.actions.pipe(
    ofType(NieuwsActionType.LaadOudereBerichtenSucces),
    withLatestFrom(this.store.pipe(select(getNieuwsState))),
    map(([_, state]) => this.nieuwsOpslagService.setOpgeslagenNieuws(state))
  );

  @Effect()
  laadOudereBerichten = this.actions
    .pipe(
      ofType(NieuwsActionType.LaadOudereBerichten),
      withLatestFrom(this.store.pipe(select(getNieuwsberichten))),
      exhaustMap(([_, nieuwsberichten]) => this.nieuwsClient.getLaatsteNieuws(nieuwsberichten ? nieuwsberichten.length : 0).pipe(
        map(nieuws => new LaadOudereNieuwsBerichtenSucces(nieuws)),
        catchError(fout => of(new LaadOudereNieuwsBerichtenFout(fout)))
      ))
    );

}
