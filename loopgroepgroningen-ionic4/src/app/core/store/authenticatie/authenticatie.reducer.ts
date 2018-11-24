import {AuthenticatieState} from './authenticatie.state';
import {AuthenticatieAction, AuthenticatieActionType} from './authenticatie.action';
import {Aanroepstatus} from '../../backend/models/aanroepstatus';

const initialAuthenticatieState: AuthenticatieState = {
  inlogstatus: Aanroepstatus.nogNietGestart,
  ingelogd: null,
  credentials: null,
  vegetables: null
};

export function authenticatieReducer(
  state = initialAuthenticatieState,
  action: AuthenticatieAction
): AuthenticatieState {

  switch (action.type) {

    case AuthenticatieActionType.HerstelOpgeslagenState:
      return {
        ...state,
        inlogstatus: Aanroepstatus.bezig
      };

    case AuthenticatieActionType.HerstelOpgeslagenStateSucces:
      return {...state, ...action.authenticatieState, inlogstatus: Aanroepstatus.uitgevoerdMetSucces};

    case AuthenticatieActionType.LogIn:
      return {
        ...state,
        inlogstatus: Aanroepstatus.bezig,
        credentials: action.credentials
      };

    case AuthenticatieActionType.LogInSucces:
      return {
        ...state,
        inlogstatus: Aanroepstatus.uitgevoerdMetSucces,
        ingelogd: true,
// TODO: vegetables?
      };

    case AuthenticatieActionType.HerstelOpgeslagenStateFout:
    case AuthenticatieActionType.LogInFout:
      return {
        ...state,
        inlogstatus: Aanroepstatus.uitgevoerdMetFout(action.fout),
        ingelogd: false
      };

  }
  return state;
}
