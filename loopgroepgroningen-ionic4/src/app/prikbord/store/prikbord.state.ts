import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';
import {Bericht} from '../../api';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface PrikbordState {
  laadstatus: Aanroepstatus;
  berichten: Bericht[];
  meerBeschikbaar: boolean;
  teVerzendenBericht: string;
  verzendstatus: Aanroepstatus;
}

export const getPrikbordState = createFeatureSelector<PrikbordState>('prikbord');

function prikbordSelector<T>(projector: (state: PrikbordState) => T) {
  return createSelector(getPrikbordState, projector);
}

export const getPrikbordBerichten = prikbordSelector(state => state.berichten);
