import {NieuwsState} from './nieuws.state';
import {NieuwsAction, NieuwsActionType} from './nieuws.action';
import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';

const initialState: NieuwsState = {
  laadstatus: Aanroepstatus.nogNietGestart,
  berichten: null,
  meerBeschikbaar: true
};

export function nieuwsReducer(
  state = initialState,
  action: NieuwsAction
): NieuwsState {
  switch (action.type) {

    case NieuwsActionType.HerstelOpgeslagenState:
    case NieuwsActionType.LaadOudereBerichten:
      return {...state, laadstatus: Aanroepstatus.bezig};

    case NieuwsActionType.HerstelOpgeslagenStateSucces:
      return {...state, ...action.nieuwsState, laadstatus: Aanroepstatus.uitgevoerdMetSucces};

    case NieuwsActionType.LaadOudereBerichtenSucces: {
      return {
        ...state,
        berichten: [...state.berichten || [], ...action.berichten],
        laadstatus: Aanroepstatus.uitgevoerdMetSucces,
        meerBeschikbaar: action.berichten.length > 0
      };
    }

    case NieuwsActionType.HerstelOpgeslagenStateFout:
    case NieuwsActionType.LaadOudereBerichtenFout: {
      return {
        ...state,
        laadstatus: Aanroepstatus.uitgevoerdMetFout(action.fout)
      };
    }
  }
  return state;
}
