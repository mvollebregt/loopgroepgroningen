import {AgendaAction, AgendaActionType} from './agenda.action';
import {AgendaState} from './agenda.state';
import {AanroepStatus} from '../../shared/backend/aanroep-status';

const initialState: AgendaState = {
  laadstatus: AanroepStatus.succes,
  evenementen: null,
  evenementdetailsLoadStatus: new Map(),
  inschrijvingenSendStatus: new Map(),
  teVerzendenBerichten: new Map()
};

export function agendaReducer(
  state = initialState,
  action: AgendaAction
): AgendaState {

  switch (action.type) {
    case AgendaActionType.LaadEvenementen:
      return {
        ...state,
        laadstatus: AanroepStatus.bezig
      };

    case AgendaActionType.LaadEvenementenSucces:
      return {
        ...state,
        laadstatus: AanroepStatus.succes,
        evenementen: action.evenementen
      };

    case AgendaActionType.LaadEvenementenFout:
      return {
        ...state,
        laadstatus: AanroepStatus.fout(action.fout)
      };
  }

  return state;
}
