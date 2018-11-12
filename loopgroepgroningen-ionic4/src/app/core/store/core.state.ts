import {createFeatureSelector, createSelector} from '@ngrx/store';
import {InstellingenState} from './instellingen/instellingen.state';

export interface CoreState {
  instellingen: InstellingenState;
}

const getCoreState = createFeatureSelector('core');
export const getInstellingenState = createSelector(getCoreState, (state: CoreState) => state.instellingen);

function instellingenSelector<T>(projector: (state: InstellingenState) => T) {
  return createSelector(getInstellingenState, projector);
}

export const getGroep = instellingenSelector(state => state.groep);
