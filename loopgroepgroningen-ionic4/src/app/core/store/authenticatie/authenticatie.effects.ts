import {Injectable} from '@angular/core';

// interface FoutAction extends Action {
//   fout?: Fout
//   sourceAction?: Action
// }

@Injectable()
export class AuthenticatieEffects {

  constructor(
    // private actions: Actions,
    // private store: Store<CoreState>,
    // private unauthorizedHandlerService: UnauthorizedHandlerService
    // private authenticatieOpslagService: AuthenticatieOpslagService,
    // private
  ) {
  }

  // @Effect()
  // handleUnauthorized = this.actions.pipe(
  //   filter((action: FoutAction) => action.fout && action.fout.status === 401),
  //   map(action => new LogIn(null, action.sourceAction))
  // );
  //
  // @Effect()
  // logIn = this.actions.pipe(
  //   ofType(AuthenticatieActionType.LogIn),
  //   switchMap((action: LogIn) =>
  //     (action.credentials ?
  //         this.unauthorizedHandlerService.login(action.credentials) :
  //         of({loggedIn: false})
  //     ).pipe(map(session =>
  //       session.loggedIn ?
  //         new LogInSucces(action.retryAction) :
  //         new LogInFout(action.retryAction))
  //     )
  //   )
  // );
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
