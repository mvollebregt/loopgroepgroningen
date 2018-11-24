import {Action} from '@ngrx/store';
import {AuthenticatieState} from './authenticatie.state';
import {Credentials, Session} from '../../../api';
import {Fout} from '../../backend/models/fout';

export enum AuthenticatieActionType {
  HerstelOpgeslagenState = '[Authenticatie] Herstel opgeslagen state',
  HerstelOpgeslagenStateSucces = '[Authenticatie] Herstel opgeslagen state succes',
  HerstelOpgeslagenStateFout = '[Authenticatie] Herstel opgeslagen state fout',
  LogIn = '[Authenticatie] Log in',
  LogInSucces = '[Authenticatie] Log in succes',
  LogInFout = '[Authenticatie] Log in fout',
  VraagOmCredentials = '[Authenticatie] Vraag om credentials',
  VraagOmCredentialsSucces = '[Authenticatie] Vraag om credentials succes',
  VraagOmCredentialsFout = '[Authenticatie] Vraag om credentials fout'
}

export class HerstelAuthenticatieOpgeslagenState implements Action {
  readonly type = AuthenticatieActionType.HerstelOpgeslagenState;
}

export class HerstelAuthenticatieOpgeslagenStateSucces implements Action {
  readonly type = AuthenticatieActionType.HerstelOpgeslagenStateSucces;

  constructor(public authenticatieState: AuthenticatieState) {
  }
}

export class HerstelAuthenticatieOpgeslagenStateFout implements Action {
  readonly type = AuthenticatieActionType.HerstelOpgeslagenStateFout;

  constructor() {
  }
}

// export class VraagOmCredentials implements Action {
//   readonly type = AuthenticatieActionType.LogIn;
//
//   constructor(public credentials?: Credentials, public retryAction?: Action) {
//   }
// }

export class LogIn implements Action {
  readonly type = AuthenticatieActionType.LogIn;

  constructor(public credentials: Credentials) {
  }
}

export class LogInSucces implements Action {
  readonly type = AuthenticatieActionType.LogInSucces;

  constructor(public session: Session) {
  }
}

export class LogInFout implements Action {
  readonly type = AuthenticatieActionType.LogInFout;

  constructor(public fout: Fout) {
  }
}

export type AuthenticatieAction =
  | HerstelAuthenticatieOpgeslagenState
  | HerstelAuthenticatieOpgeslagenStateSucces
  | HerstelAuthenticatieOpgeslagenStateFout
  | LogIn
  | LogInSucces
  | LogInFout;
