import {
  _getNieuwsberichten,
  _getNieuwsberichtenLoaded,
  _getNieuwsberichtenLoading,
  nieuwsberichtenReducer,
  NieuwsberichtState
} from './nieuwberichten.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface NieuwsState {
  nieuwsberichten: NieuwsberichtState;
}

export const nieuwsReducers = {nieuwsberichten: nieuwsberichtenReducer};

const getNieuwsState = createFeatureSelector<NieuwsState>('nieuws');
const getNieuwsberichtenState = createSelector(getNieuwsState, (state: NieuwsState) => state.nieuwsberichten);

export const getNieuwsberichten = createSelector(getNieuwsberichtenState, _getNieuwsberichten);
export const getNieuwsberichtenLoaded = createSelector(getNieuwsberichtenState, _getNieuwsberichtenLoaded);
export const getNieuwsberichtenLoading = createSelector(getNieuwsberichtenState, _getNieuwsberichtenLoading);
