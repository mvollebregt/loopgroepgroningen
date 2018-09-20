import {
  LOAD_MORE_NIEUWSBERICHTEN,
  LOAD_MORE_NIEUWSBERICHTEN_SUCCESS,
  LOAD_NIEUWSBERICHTEN_FAIL,
  NieuwsberichtenAction
} from './nieuwsberichten.action';
import {Nieuwsbericht} from '../../api';

export interface NieuwsberichtState {
  nieuwsberichten: Nieuwsbericht[];
  loadingMore: boolean;
  reachedEndOfList: boolean;
}

const initialState: NieuwsberichtState = {
  nieuwsberichten: [],
  loadingMore: false,
  reachedEndOfList: false
};

export function nieuwsberichtenReducer(
  state = initialState,
  action: NieuwsberichtenAction
): NieuwsberichtState {
  switch (action.type) {
    case LOAD_MORE_NIEUWSBERICHTEN: {
      return {
        ...state,
        loadingMore: true
      };
    }

    case LOAD_MORE_NIEUWSBERICHTEN_SUCCESS: {
      return {
        ...state,
        nieuwsberichten: [...state.nieuwsberichten, ...action.payload],
        loadingMore: false,
        reachedEndOfList: action.payload.length === 0
      }
    }

    case LOAD_NIEUWSBERICHTEN_FAIL: {
      return {
        ...state,
        loadingMore: false
      };
    }
  }
  return state;
}

export const _getNieuwsberichten = (state: NieuwsberichtState) => state.nieuwsberichten;
export const _getLoadingMore = (state: NieuwsberichtState) => state.loadingMore;
export const _getReachedEndOfList = (state: NieuwsberichtState) => state.reachedEndOfList;

