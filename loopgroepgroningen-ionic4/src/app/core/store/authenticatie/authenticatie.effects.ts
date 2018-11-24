import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AuthenticatieActionType,
  HerstelAuthenticatieOpgeslagenStateFout,
  HerstelAuthenticatieOpgeslagenStateSucces,
  LogIn,
  LogInFout,
  LogInSucces
} from './authenticatie.action';
import {AuthenticatieOpslagService} from '../../services/authenticatie-opslag.service';
import {UnauthorizedHandlerService} from '../../services/unauthorized-handler.service';
import {select, Store} from '@ngrx/store';
import {CoreState} from '../core.state';
import {getAuthenticatieState} from './authenticatie.state';

// interface FoutAction extends Action {
//   fout?: Fout
//   sourceAction?: Action
// }

@Injectable()
export class AuthenticatieEffects {

  constructor(
    private actions: Actions,
    private authenticatieOpslagService: AuthenticatieOpslagService,
    private store: Store<CoreState>,
    private unauthorizedHandlerService: UnauthorizedHandlerService
  ) {
  }


  @Effect()
  herstelOpgeslagenState = this.actions.pipe(
    ofType(AuthenticatieActionType.HerstelOpgeslagenState),
    exhaustMap(() => this.authenticatieOpslagService.getOpgeslagenAuthenticatie().pipe(
      map(authenticatie => authenticatie
        ? new HerstelAuthenticatieOpgeslagenStateSucces(authenticatie)
        : new HerstelAuthenticatieOpgeslagenStateFout()),
      catchError(() => of(new HerstelAuthenticatieOpgeslagenStateFout()))
    ))
  );

  @Effect({dispatch: false})
  bewaarOpgeslagenState = this.actions.pipe(
    ofType(AuthenticatieActionType.LogInSucces),
    withLatestFrom(this.store.pipe(select(getAuthenticatieState))),
    map(([_, state]) => this.authenticatieOpslagService.setOpgeslagenAuthenticatie(state))
  );

  // @Effect()
  // handleUnauthorized = this.actions.pipe(
  //   filter((action: FoutAction) => action.fout && action.fout.status === 401),
  //   map(action => new LogIn(null, action.sourceAction))
  // );
  //
  @Effect()
  logIn = this.actions.pipe(
    ofType(AuthenticatieActionType.LogIn),
    switchMap((action: LogIn) => this.unauthorizedHandlerService.login(action.credentials).pipe(
      map(session => new LogInSucces(session)),
      catchError(fout => of(new LogInFout(fout)))
    ))
  );

  //
  // @Effect()
  // logInSucces = this.actions.pipe(
  //   ofType(AuthenticatieActionType.LogInSucces),
  //   filter((action: LogInSucces) => !!action.retryAction),
  //   map(action => action.retryAction)
  // );
  //
  // @Effect()
  // logInFout = this.actions.pipe(
  //   ofType(AuthenticatieActionType.LogInFout),
  //   map((action: LogInFout) => new VraagOmCredentials(null, action.retryAction)) // TODO: pass credentials?
  // )

}
