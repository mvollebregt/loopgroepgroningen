import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {
  HerstelInstellingenOpgeslagenStateFout,
  HerstelInstellingenOpgeslagenStateSucces,
  InstellingenActionType
} from './instellingen.action';
import {InstellingenOpslagService} from '../../services/instellingen-opslag.service';
import {of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {CoreState} from '../core.state';
import {getInstellingenState} from './instellingen.state';

@Injectable()
export class InstellingenEffects {

  constructor(
    private actions: Actions,
    private store: Store<CoreState>,
    private instellingenOpslagService: InstellingenOpslagService
  ) {
  }

  @Effect()
  herstelOpgeslagenState = this.actions.pipe(
    ofType(InstellingenActionType.HerstelOpgeslagenState),
    exhaustMap(() => this.instellingenOpslagService.getOpgeslagenInstellingen()),
    map(instellingen => instellingen
      ? new HerstelInstellingenOpgeslagenStateSucces(instellingen)
      : new HerstelInstellingenOpgeslagenStateFout({melding: 'Nog niets opgeslagen'})),
    catchError(fout => of(new HerstelInstellingenOpgeslagenStateFout(fout)))
  );

  @Effect({dispatch: false})
  bewaarOpgeslagenState = this.actions.pipe(
    ofType(InstellingenActionType.ZetGroep),
    withLatestFrom(this.store.pipe(select(getInstellingenState))),
    map(([_, state]) => this.instellingenOpslagService.setOpgeslagenInstellingen(state))
  );

}
