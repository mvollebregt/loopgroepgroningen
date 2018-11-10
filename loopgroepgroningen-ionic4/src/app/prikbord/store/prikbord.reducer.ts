import {PrikbordState} from './prikbord.state';
import {AanroepStatus} from '../../shared/backend/aanroep-status';
import {PrikbordAction, PrikbordActionType} from './prikbord.action';

const initialPrikbordState: PrikbordState = {
  laadstatus: AanroepStatus.succes,
  berichten: null,
  meerBeschikbaar: true,
  teVerzendenBericht: '',
  verzendstatus: AanroepStatus.succes
};

export function prikbordReducer(
  state = initialPrikbordState,
  action: PrikbordAction
): PrikbordState {

  switch (action.type) {
    case PrikbordActionType.LaadOudereBerichten:
      return {
        ...state,
        laadstatus: AanroepStatus.bezig
      };
    case PrikbordActionType.LaadOudereBerichtenSucces:
      return {
        ...state,
        berichten: [...action.berichten.reverse(), ...state.berichten || []], // TODO: checken op dubbel (als nieuwere berichten zijn binnengekomen)
        laadstatus: AanroepStatus.succes,
        meerBeschikbaar: action.berichten.length > 0
      };
    case PrikbordActionType.LaadOudereBerichtenFout:
      return {
        ...state,
        laadstatus: AanroepStatus.fout(action.fout)
      };
    case PrikbordActionType.TypBericht:
      return {
        ...state,
        teVerzendenBericht: action.bericht
      }
  }

  return state;
}
