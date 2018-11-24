import {Credentials} from '../../../api';
import {Aanroepstatus} from '../../backend/models/aanroepstatus';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from '../core.state';

export interface AuthenticatieState {
  inlogstatus: Aanroepstatus;
  ingelogd: boolean;
  credentials: Credentials;
  vegetables: any;
}

const getCoreState = createFeatureSelector('core');

export const getAuthenticatieState = createSelector(getCoreState, (state: CoreState) => state.authenticatie);

function authenticatieSelector<T>(projector: (state: AuthenticatieState) => T) {
  return createSelector(getAuthenticatieState, projector);
}

export const getAuthenticatieInlogStatus = authenticatieSelector(state => state.inlogstatus);
export const getAuthenticatieAanroepfase = createSelector(getAuthenticatieInlogStatus, status => status.fase);
export const getAuthenticatieMelding = createSelector(getAuthenticatieInlogStatus, state => state.fout && state.fout.melding);
export const getAuthenticatieIngelogd = authenticatieSelector(state => state.ingelogd);
export const getAuthenticatieCredentials = authenticatieSelector(state => state.credentials);
