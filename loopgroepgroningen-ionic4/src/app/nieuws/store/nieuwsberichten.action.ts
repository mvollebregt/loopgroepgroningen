import {Action} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';

// load nieuwsberichten
export const LOAD_MORE_NIEUWSBERICHTEN = '[Nieuwsberichten] Load More Nieuwsberichten'
export const LOAD_NIEUWSBERICHTEN_FAIL = '[Nieuwsberichten] Load Nieuwsberichten Failed';
export const LOAD_MORE_NIEUWSBERICHTEN_SUCCESS = '[Nieuwsberichten] Load More Nieuwsberichten Success';
export const LOAD_NIEUWSBERICHTEN_SUCCESS = '[Nieuwsberichten] Load Nieuwsberichten Success';


export class LoadMoreNieuwsberichten implements Action {
  readonly type = LOAD_MORE_NIEUWSBERICHTEN;
}

export class LoadNieuwsberichtenFail implements Action {
  readonly type = LOAD_NIEUWSBERICHTEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadMoreNieuwsberichtenSuccess implements Action {
  readonly type = LOAD_MORE_NIEUWSBERICHTEN_SUCCESS;

  constructor(public payload: Nieuwsbericht[]) {
  }
}

export class LoadNieuwsberichtenSuccess implements Action {
  readonly type = LOAD_NIEUWSBERICHTEN_SUCCESS;
  constructor(public payload: Nieuwsbericht[]) {}
}

// action types
export type NieuwsberichtenAction =
  | LoadMoreNieuwsberichten
  | LoadNieuwsberichtenFail
  | LoadMoreNieuwsberichtenSuccess
  | LoadNieuwsberichtenSuccess;
