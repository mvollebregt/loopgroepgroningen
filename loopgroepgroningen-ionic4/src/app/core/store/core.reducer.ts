import {instellingenReducer} from './instellingen/instellingen.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from './core.state';

export const coreReducers = {
  instellingen: instellingenReducer
};

const getCoreState = createFeatureSelector<CoreState>('core');

const getInstellingenState = createSelector(getCoreState, state => state.instellingen);
export const getNieuwsberichten = createSelector(getInstellingenState, state => state.groep);

