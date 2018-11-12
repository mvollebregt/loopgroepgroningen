import {settingsReducer} from './settings/settings.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from './core.state';

export const coreReducers = {
  settings: settingsReducer
};

const getCoreState = createFeatureSelector<CoreState>('core');

const getSettingsState = createSelector(getCoreState, state => state.settings);
export const getNieuwsberichten = createSelector(getSettingsState, state => state.groep);
