import {InstellingenState} from './instellingen.state';
import {InstellingenAction, InstellingenActionType} from './instellingen.action';
import {Aanroepstatus} from '../../backend/models/aanroepstatus';

const initialInstellingenState: InstellingenState = {
  laadstatus: Aanroepstatus.nogNietGestart,
  groep: 'A'
};

export function instellingenReducer(
  state = initialInstellingenState,
  action: InstellingenAction
): InstellingenState {

  switch (action.type) {

    case InstellingenActionType.HerstelOpgeslagenStateSucces:
      return {...state, ...action.instellingenState};

    case InstellingenActionType.ZetGroep:
      return {
        ...state,
        groep: action.groep
      };
  }

  return state;
}
