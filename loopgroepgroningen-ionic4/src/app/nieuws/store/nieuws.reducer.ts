import {NieuwsState} from './nieuws.state';
import {NieuwsAction, NieuwsActionType} from './nieuws.action';
import {AanroepStatus} from '../../core/backend/aanroep-status';

const initialState: NieuwsState = {
  laadstatus: AanroepStatus.succes,
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
      return {...state, laadstatus: AanroepStatus.bezig};

    case NieuwsActionType.HerstelOpgeslagenStateSucces:
      return {...state, ...action.nieuwsState, laadstatus: AanroepStatus.succes};

    case NieuwsActionType.LaadOudereBerichtenSucces: {
      return {
        ...state,
        berichten: [...state.berichten || [], ...action.berichten],
        laadstatus: AanroepStatus.succes,
        meerBeschikbaar: action.berichten.length > 0
      };
    }

    case NieuwsActionType.HerstelOpgeslagenStateFout:
    case NieuwsActionType.LaadOudereBerichtenFout: {
      return {
        ...state,
        laadstatus: AanroepStatus.fout(action.fout)
      };
    }
  }
  return state;
}
