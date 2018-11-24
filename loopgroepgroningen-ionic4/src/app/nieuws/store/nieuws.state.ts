import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';
import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';

export interface NieuwsState {
  laadstatus: Aanroepstatus;
  berichten: Nieuwsbericht[];
  meerBeschikbaar: boolean;
}

export const getNieuwsState = createFeatureSelector<NieuwsState>('nieuws');

function nieuwsSelector<T>(projector: (state: NieuwsState) => T) {
  return createSelector(getNieuwsState, projector);
}

export const getNieuwsberichten = nieuwsSelector(state => state.berichten);
export const getNieuwsLaadStatus = nieuwsSelector(state => state.laadstatus);
export const getMeerNieuwsBeschikbaar = nieuwsSelector(state => state.meerBeschikbaar);
