import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';
import {Evenement} from '../../api';

export interface AgendaState {
  laadstatus: Aanroepstatus;
  evenementStates: Map<string, EvenementState>;
}

export interface EvenementState {

  laadstatus: Aanroepstatus;
  evenement?: Evenement;
  teVerzendenBericht: string;
  inschrijvingVerzendstatus: Aanroepstatus;
  berichtVerzendstatus: Aanroepstatus;

}

export const getAgendaState = createFeatureSelector<AgendaState>('agenda');

function agendaSelector<T>(projector: (state: AgendaState) => T) {
  return createSelector(getAgendaState, projector);
}

export const getAgendaLaadstatus = agendaSelector(state => state.laadstatus);

export const getAgendaEvenementen = agendaSelector(state =>
  state.evenementStates && Array.from(state.evenementStates.values()).map(evenementState => evenementState.evenement));

export function getAgendaEvenement(id: string) {
  return agendaSelector(state => state.evenementStates.get(id).evenement);
}
