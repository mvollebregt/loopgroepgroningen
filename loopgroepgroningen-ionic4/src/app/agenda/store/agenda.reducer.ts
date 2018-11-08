import {AgendaAction, AgendaActionType} from './agenda.action';
import {AgendaState, EvenementState} from './agenda.state';
import {AanroepStatus} from '../../shared/backend/aanroep-status';

const initialAgendaState: AgendaState = {
  laadstatus: AanroepStatus.succes,
  evenementStates: null,
};

const initialEvenementState: EvenementState = {
  laadstatus: AanroepStatus.succes,
  evenement: null,
  teVerzendenBericht: '',
  inschrijvingVerzendstatus: AanroepStatus.succes,
  berichtVerzendstatus: AanroepStatus.succes
};

export function agendaReducer(
  state = initialAgendaState,
  action: AgendaAction
): AgendaState {

  function metEvenementstate(id: string, evenementState: Partial<EvenementState>): Map<string, EvenementState> {
    const evenementen = new Map(state.evenementStates);
    const evenement = {...evenementen.get(id) || initialEvenementState, ...evenementState};
    return evenementen.set(id, evenement);
  }

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
        evenementStates: new Map(
          action.evenementen.map(evenement => [evenement.id, {
            ...initialEvenementState,
            evenement
          }] as [string, EvenementState]))
      };

    case AgendaActionType.LaadEvenementenFout:
      return {
        ...state,
        laadstatus: AanroepStatus.fout(action.fout)
      };

    case AgendaActionType.LaadEvenementdetails:
      return {
        ...state,
        evenementStates: metEvenementstate(action.id, {
          laadstatus: AanroepStatus.bezig
        })
      };

    case AgendaActionType.LaadEvenementdetailsSucces:
      return {
        ...state,
        evenementStates: metEvenementstate(action.id, {
          laadstatus: AanroepStatus.succes,
          evenement: action.evenement
        })
      };

    case AgendaActionType.LaadEvenementdetailsFout:
      return {
        ...state,
        evenementStates: metEvenementstate(action.id, {
          laadstatus: AanroepStatus.fout(action.fout)
        })
      };
  }

  return state;
}
