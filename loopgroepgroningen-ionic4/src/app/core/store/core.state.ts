import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SettingsState} from './settings/settings.state';

export interface CoreState {
  settings: SettingsState;
}

const getCoreState = createFeatureSelector('core');
const getSettingsState = createSelector(getCoreState, (state: CoreState) => state.settings);

function settingsSelector<T>(projector: (state: SettingsState) => T) {
  return createSelector(getSettingsState, projector);
}

export const getGroep = settingsSelector(state => state.groep);
