import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {PrikbordClient} from '../services/prikbord.client';
import {select, Store} from '@ngrx/store';
import {getPrikbordBerichten, getPrikbordState, PrikbordState} from './prikbord.state';
import {
  CheckNieuwePrikbordBerichtenFout,
  CheckNieuwePrikbordBerichtenSucces,
  HerstelPrikbordOpgeslagenStateFout,
  HerstelPrikbordOpgeslagenStateSucces,
  LaadOuderePrikbordBerichtenFout,
  LaadOuderePrikbordBerichtenSucces,
  PrikbordActionType
} from './prikbord.action';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {PrikbordOpslagService} from '../services/prikbord-opslag.service';

@Injectable()
export class PrikbordEffects {

  constructor(
    private actions: Actions,
    private store: Store<PrikbordState>,
    private prikbordOpslagService: PrikbordOpslagService,
    private prikbordClient: PrikbordClient,
  ) {
  }

  @Effect()
  herstelOpgeslagenState = this.actions.pipe(
    ofType(PrikbordActionType.HerstelOpgeslagenState),
    exhaustMap(() => this.prikbordOpslagService.getOpgeslagenPrikbord().pipe(
      map(prikbord => prikbord
        ? new HerstelPrikbordOpgeslagenStateSucces(prikbord)
        : new HerstelPrikbordOpgeslagenStateFout({melding: 'Nog niets opgeslagen'})),
      catchError(fout => of(new HerstelPrikbordOpgeslagenStateFout(fout)))
    ))
  );

  @Effect({dispatch: false})
  bewaarOpgeslagenState = this.actions.pipe(
    ofType(
      PrikbordActionType.CheckNieuweBerichtenSucces,
      PrikbordActionType.LaadOudereBerichtenSucces,
      PrikbordActionType.TypBericht,
      PrikbordActionType.VerstuurBerichtSucces),
    withLatestFrom(this.store.pipe(select(getPrikbordState))),
    map(([_, state]) => this.prikbordOpslagService.setOpgeslagenPrikbord(state))
  );

  @Effect()
  checkNieuweBerichten = this.actions.pipe(
    ofType(PrikbordActionType.CheckNieuweBerichten),
    exhaustMap(() => this.prikbordClient.getBerichten().pipe(
      map(resultaat => new CheckNieuwePrikbordBerichtenSucces(resultaat)),
      catchError(fout => of(new CheckNieuwePrikbordBerichtenFout(fout)))
    ))
  );

  @Effect()
  laadOudereBerichten = this.actions.pipe(
    ofType(PrikbordActionType.LaadOudereBerichten),
    withLatestFrom(this.store.pipe(select(getPrikbordBerichten))),
    exhaustMap(([_, berichten]) => this.prikbordClient.getBerichten(berichten && berichten.length || undefined).pipe(
      map(resultaat => new LaadOuderePrikbordBerichtenSucces(resultaat)),
      catchError(fout => of(new LaadOuderePrikbordBerichtenFout(fout)))
    ))
  );

}
