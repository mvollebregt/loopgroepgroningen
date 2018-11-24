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
        ingelogd: true
      };
  }
  return state;
}
