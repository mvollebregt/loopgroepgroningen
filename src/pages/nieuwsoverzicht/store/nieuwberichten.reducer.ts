import {Nieuwsbericht} from '../models/nieuwsbericht';
import {
  LOAD_NIEUWSBERICHTEN,
  LOAD_NIEUWSBERICHTEN_FAIL,
  LOAD_NIEUWSBERICHTEN_SUCCESS,
  NieuwsberichtenAction
} from './nieuwsberichten.action';

export interface NieuwsberichtState {
  loaded: boolean;
  loading: boolean;
  nieuwsberichten: Nieuwsbericht[];
}

const initialState: NieuwsberichtState = {
  loaded: false,
  loading: false,
  nieuwsberichten: [],
};

export function nieuwsberichtenReducer(
  state = initialState,
  action: NieuwsberichtenAction
): NieuwsberichtState {
  switch (action.type) {
    case LOAD_NIEUWSBERICHTEN: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case LOAD_NIEUWSBERICHTEN_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        nieuwsberichten: action.payload,
      };
    }

    case LOAD_NIEUWSBERICHTEN_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }
  }
  return state;
}

export const _getNieuwsberichten = (state: NieuwsberichtState) => state.nieuwsberichten;
export const _getNieuwsberichtenLoaded = (state: NieuwsberichtState) => state.loaded;
export const _getNieuwsberichtenLoading = (state: NieuwsberichtState) => state.loading;

