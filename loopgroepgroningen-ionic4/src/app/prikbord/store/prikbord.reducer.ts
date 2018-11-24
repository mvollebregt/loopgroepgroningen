import {PrikbordState} from './prikbord.state';
import {AanroepStatus} from '../../core/backend/aanroep-status';
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

    case PrikbordActionType.HerstelOpgeslagenState:
    case PrikbordActionType.CheckNieuweBerichten:
    case PrikbordActionType.LaadOudereBerichten:
      return {
        ...state,
        laadstatus: AanroepStatus.bezig
      };

    case PrikbordActionType.HerstelOpgeslagenStateSucces:
      return {...state, ...action.prikbordState, laadstatus: AanroepStatus.succes};

    case PrikbordActionType.CheckNieuweBerichtenSucces:
      let berichten;
      if (!state.berichten) {
        berichten = action.berichten.reverse();
      } else {
        const checkDatum = state.berichten[state.berichten.length - 1].tijdstip;
        const alBestaandeIndex = action.berichten.findIndex(bericht => bericht.tijdstip <= checkDatum);
        // TODO: betere check op nieuwe berichten? (gaat nu mis bij meerdere berichten in één minuut!)
        // TODO: als er meer dan 10 nieuw zijn dan moet er nog meer gecheckt worden!
        berichten = [...state.berichten, ...action.berichten.slice(0, alBestaandeIndex).reverse()];
      }
      return {
        ...state,
        berichten,
        laadstatus: AanroepStatus.succes
      };

    case PrikbordActionType.LaadOudereBerichtenSucces:
      return {
        ...state,
        berichten: [...action.berichten.reverse(), ...state.berichten || []],
        // TODO: checken op dubbel (als nieuwere berichten zijn binnengekomen)
        laadstatus: AanroepStatus.succes,
        meerBeschikbaar: action.berichten.length > 0
      };

    case PrikbordActionType.TypBericht:
      return {
        ...state,
        teVerzendenBericht: action.bericht
      };

    case PrikbordActionType.HerstelOpgeslagenStateFout:
    case PrikbordActionType.CheckNieuweBerichtenFout:
    case PrikbordActionType.LaadOudereBerichtenFout:
      return {
        ...state,
        laadstatus: AanroepStatus.fout(action.fout)
      };

  }

  return state;
}
