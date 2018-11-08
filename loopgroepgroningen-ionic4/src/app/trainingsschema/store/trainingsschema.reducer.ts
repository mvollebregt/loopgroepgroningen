import {AanroepStatus} from '../../shared/backend/aanroep-status';
import {TrainingsschemaState} from './trainingsschema.state';
import {TrainingsschemaAction, TrainingsschemaActionType} from './trainingsschema.action';

const initialTrainingsschemaState: TrainingsschemaState = {
  laadstatus: AanroepStatus.succes,
  trainingsschema: null,
};

export function trainingsschemaReducer(
  state = initialTrainingsschemaState,
  action: TrainingsschemaAction
): TrainingsschemaState {

  switch (action.type) {
    case TrainingsschemaActionType.LaadTrainingsschema:
      return {
        ...state,
        laadstatus: AanroepStatus.bezig
      };

    case TrainingsschemaActionType.LaadTrainingsschemaSucces:
      return {
        ...state,
        laadstatus: AanroepStatus.succes,
        trainingsschema: action.trainingsschema
      };

    case TrainingsschemaActionType.LaadTrainingsschemaFout:
      return {
        ...state,
        laadstatus: AanroepStatus.fout(action.fout)
      };
  }

  return state;
}
