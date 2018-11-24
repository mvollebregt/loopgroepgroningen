import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Aanroepstatus} from '../../core/backend/models/aanroepstatus';
import {Trainingsschema} from '../../api';

export interface TrainingsschemaState {
  laadstatus: Aanroepstatus;
  trainingsschema: Trainingsschema;
}

export const getTrainingsschemaState = createFeatureSelector<TrainingsschemaState>('trainingsschema');

function trainingsschemaSelector<T>(projector: (state: TrainingsschemaState) => T) {
  return createSelector(getTrainingsschemaState, projector);
}

export const getTrainingsschema = trainingsschemaSelector(state => state.trainingsschema);
