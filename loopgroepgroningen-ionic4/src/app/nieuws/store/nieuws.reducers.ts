import {
  _getLoadingMore,
  _getNieuwsberichten,
  _getReachedEndOfList,
  nieuwsberichtenReducer,
  NieuwsberichtState
} from './nieuwberichten.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface NieuwsState {
  nieuwsberichten: NieuwsberichtState;
}

export const nieuwsReducers = {nieuwsberichten: nieuwsberichtenReducer};

const getNieuwsState = createFeatureSelector<NieuwsState>('nieuws');
export const getNieuwsberichtenState = createSelector(getNieuwsState, (state: NieuwsState) => state.nieuwsberichten);

export const getNieuwsberichten = createSelector(getNieuwsberichtenState, _getNieuwsberichten);
export const getLoadingMore = createSelector(getNieuwsberichtenState, _getLoadingMore);
export const getReachedEndOfList = createSelector(getNieuwsberichtenState, _getReachedEndOfList);

