import {Action} from '@ngrx/store';
import {Nieuwsbericht} from '../../api';

// load nieuwsberichten
export const LOAD_NIEUWSBERICHTEN = '[Products] Load Nieuwsberichten';
export const LOAD_NIEUWSBERICHTEN_FAIL = '[Products] Load Nieuwsberichten Failed';
export const LOAD_NIEUWSBERICHTEN_SUCCESS = '[Products] Load Nieuwsberichten Success';

export class LoadNieuwsberichten implements Action {
  readonly type = LOAD_NIEUWSBERICHTEN;
}

export class LoadNieuwsberichtenFail implements Action {
  readonly type = LOAD_NIEUWSBERICHTEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadNieuwsberichtenSuccess implements Action {
  readonly type = LOAD_NIEUWSBERICHTEN_SUCCESS;
  constructor(public payload: Nieuwsbericht[]) {}
}

// action types
export type NieuwsberichtenAction =
  | LoadNieuwsberichten
  | LoadNieuwsberichtenFail
  | LoadNieuwsberichtenSuccess;
