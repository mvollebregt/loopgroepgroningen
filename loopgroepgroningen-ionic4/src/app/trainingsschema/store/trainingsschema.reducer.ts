import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';
import {TrainingsschemaState} from './trainingsschema.state';
import {TrainingsschemaAction, TrainingsschemaActionType} from './trainingsschema.action';

const initialTrainingsschemaState: TrainingsschemaState = {
  laadstatus: Aanroepstatus.nogNietGestart,
  trainingsschema: null,
};

export function trainingsschemaReducer(
  state = initialTrainingsschemaState,
  action: TrainingsschemaAction
): TrainingsschemaState {

  switch (action.type) {

    case TrainingsschemaActionType.HerstelOpgeslagenState:
    case TrainingsschemaActionType.LaadTrainingsschema:
      return {...state, laadstatus: Aanroepstatus.bezig};

    case TrainingsschemaActionType.HerstelOpgeslagenStateSucces:
      return {...state, ...action.trainingsschemaState, laadstatus: Aanroepstatus.uitgevoerdMetSucces};

    case TrainingsschemaActionType.LaadTrainingsschemaSucces:
      return {
        ...state,
        laadstatus: Aanroepstatus.uitgevoerdMetSucces,
        trainingsschema: action.trainingsschema
      };

    case TrainingsschemaActionType.HerstelOpgeslagenStateFout:
    case TrainingsschemaActionType.LaadTrainingsschemaFout:
      return {...state, laadstatus: Aanroepstatus.uitgevoerdMetFout(action.fout)};
  }

  return state;
}
