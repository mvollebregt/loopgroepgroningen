import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AanroepStatus} from '../../core/backend/aanroep-status';
import {Trainingsschema} from '../../api';

export interface TrainingsschemaState {
  laadstatus: AanroepStatus;
  trainingsschema: Trainingsschema;
}

export const getTrainingsschemaState = createFeatureSelector<TrainingsschemaState>('trainingsschema');

function trainingsschemaSelector<T>(projector: (state: TrainingsschemaState) => T) {
  return createSelector(getTrainingsschemaState, projector);
}

export const getTrainingsschema = trainingsschemaSelector(state => state.trainingsschema);
