import {AuthenticatieState} from './authenticatie.state';
import {AuthenticatieAction, AuthenticatieActionType} from './authenticatie.action';

const initialAuthenticatieState: AuthenticatieState = {
  geinitialiseerd: false,
  bezig: false,
  fout: null,
  credentials: null,
  session: null,
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
        bezig: true
      };

    case AuthenticatieActionType.HerstelOpgeslagenStateSucces:
      return {
        ...state,
        ...action.authenticatieState,
        geinitialiseerd: true,
        bezig: false
      };

    case AuthenticatieActionType.HerstelOpgeslagenStateFout:
      return {
        ...state,
        geinitialiseerd: true,
        bezig: false
      };


    case AuthenticatieActionType.LogIn:
      return {
        ...state,
        bezig: true,
        credentials: action.credentials
      };

    case AuthenticatieActionType.LogInSucces:
      return {
        ...state,
        bezig: false,
        fout: null,
        session: action.session,
        vegetables: null
// TODO: vegetables?
      };

    case AuthenticatieActionType.LogInFout:
      return {
        ...state,
        bezig: false,
        fout: action.fout,
      };

  }
  return state;
}
