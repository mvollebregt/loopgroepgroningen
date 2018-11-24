import {AgendaAction, AgendaActionType} from './agenda.action';
import {AgendaState, EvenementState} from './agenda.state';
import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';
import {Evenement} from '../../api';

const initialAgendaState: AgendaState = {
  laadstatus: Aanroepstatus.nogNietGestart,
  evenementStates: null,
};

const initialEvenementState: EvenementState = {
  laadstatus: Aanroepstatus.nogNietGestart,
  evenement: null,
  teVerzendenBericht: '',
  inschrijvingVerzendstatus: Aanroepstatus.nogNietGestart,
  berichtVerzendstatus: Aanroepstatus.nogNietGestart
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

  function voegSamenMetBestaande(evenement: Evenement): [string, EvenementState] {
    const bestaande = state.evenementStates && state.evenementStates.get(evenement.id);
    return [evenement.id, {
      ...initialEvenementState,
      evenement: {
        ...evenement,
        naam: evenement.naam.endsWith('...') && bestaande ? bestaande.evenement.naam : evenement.naam,
        details: bestaande ? bestaande.evenement.details : null
      }
    }];
  }

  switch (action.type) {

    case AgendaActionType.HerstelOpgeslagenState:
    case AgendaActionType.LaadEvenementen:
      return {
        ...state,
        laadstatus: Aanroepstatus.bezig
      };

    case AgendaActionType.LaadEvenementdetails:
      return {
        ...state,
        evenementStates: metEvenementstate(action.id, {
          laadstatus: Aanroepstatus.bezig
        })
      };


    case AgendaActionType.HerstelOpgeslagenStateSucces:
      return {...state, ...action.agendaState, laadstatus: Aanroepstatus.uitgevoerdMetSucces};

    case AgendaActionType.LaadEvenementenSucces:
      return {
        ...state,
        laadstatus: Aanroepstatus.uitgevoerdMetSucces,
        evenementStates: new Map(action.evenementen.map(voegSamenMetBestaande))
      };

    case AgendaActionType.LaadEvenementdetailsSucces:
      return {
        ...state,
        evenementStates: metEvenementstate(action.id, {
          laadstatus: Aanroepstatus.uitgevoerdMetSucces,
          evenement: action.evenement
        })
      };

    case AgendaActionType.HerstelOpgeslagenStateFout:
    case AgendaActionType.LaadEvenementenFout:
      return {
        ...state,
        laadstatus: Aanroepstatus.uitgevoerdMetFout(action.fout)
      };


    case AgendaActionType.LaadEvenementdetailsFout:
      return {
        ...state,
        evenementStates: metEvenementstate(action.id, {
          laadstatus: Aanroepstatus.uitgevoerdMetFout(action.fout)
        })
      };
  }

  return state;
}
