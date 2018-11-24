import {Aanroepstatus} from '../../backend/models/aanroepstatus';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from '../core.state';

export interface InstellingenState {
  laadstatus: Aanroepstatus;
  groep: 'A' | 'B' | 'C';
}

const getCoreState = createFeatureSelector('core');

export const getInstellingenState = createSelector(getCoreState, (state: CoreState) => state.instellingen);

function instellingenSelector<T>(projector: (state: InstellingenState) => T) {
  return createSelector(getInstellingenState, projector);
}

export const getGroep = instellingenSelector(state => state.groep);
