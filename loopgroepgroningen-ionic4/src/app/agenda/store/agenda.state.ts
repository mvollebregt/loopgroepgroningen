import {Evenement} from '../../api';
import {TeVerzendenBericht} from '../../shared/berichten/te-verzenden-bericht';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AanroepStatus} from '../../shared/backend/aanroep-status';

export interface AgendaState {
  laadstatus: AanroepStatus;
  evenementen: Evenement[];
  evenementdetailsLoadStatus: Map<string, AanroepStatus>;
  inschrijvingenSendStatus: Map<string, AanroepStatus>;
  teVerzendenBerichten: Map<string, TeVerzendenBericht>;
}

export const getAgendaState = createFeatureSelector<AgendaState>('agenda');

function agendaSelector<T>(projector: (state: AgendaState) => T) {
  return createSelector(getAgendaState, projector);
}

export const getAgendaLaadstatus = agendaSelector(state => state.laadstatus);
export const getAgendaEvenementen = agendaSelector(state => state.evenementen);
