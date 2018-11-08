import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AanroepStatus} from '../../shared/backend/aanroep-status';
import {Evenement} from '../../api';

export interface AgendaState {
  laadstatus: AanroepStatus;
  evenementStates: Map<string, EvenementState>
}

export interface EvenementState {

  laadstatus: AanroepStatus,
  evenement?: Evenement;
  teVerzendenBericht: string
  inschrijvingVerzendstatus: AanroepStatus;
  berichtVerzendstatus: AanroepStatus;

}

export const getAgendaState = createFeatureSelector<AgendaState>('agenda');

function agendaSelector<T>(projector: (state: AgendaState) => T) {
  return createSelector(getAgendaState, projector);
}

export const getAgendaLaadstatus = agendaSelector(state => state.laadstatus);

export const getAgendaEvenementen = agendaSelector(state =>
  state.evenementStates && Array.from(state.evenementStates.values()).map(evenementState => evenementState.evenement));

export function getAgendaEvenement(id: string) {
  return agendaSelector(state => state.evenementStates.get(id).evenement)
}
