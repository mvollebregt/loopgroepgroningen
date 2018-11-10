import {AanroepStatus} from '../../shared/backend/aanroep-status';
import {Bericht} from '../../api';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface PrikbordState {
  laadstatus: AanroepStatus;
  berichten: Bericht[];
  meerBeschikbaar: boolean,
  teVerzendenBericht: string;
  verzendstatus: AanroepStatus;
}

const getPrikbordState = createFeatureSelector<PrikbordState>('prikbord');

function prikbordSelector<T>(projector: (state: PrikbordState) => T) {
  return createSelector(getPrikbordState, projector);
}

export const getPrikbordBerichten = prikbordSelector(state => state.berichten);
