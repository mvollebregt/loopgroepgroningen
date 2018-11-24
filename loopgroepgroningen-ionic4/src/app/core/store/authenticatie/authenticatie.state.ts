import {Credentials, Session} from '../../../api';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from '../core.state';
import {Fout} from '../../backend/models/fout';

export interface AuthenticatieState {

  geinitialiseerd: boolean;
  bezig: boolean;
  fout: Fout;
  credentials: Credentials;
  session: Session;
  vegetables: any;

}

const getCoreState = createFeatureSelector('core');

export const getAuthenticatieState = createSelector(getCoreState, (state: CoreState) => state.authenticatie);

function authenticatieSelector<T>(projector: (state: AuthenticatieState) => T) {
  return createSelector(getAuthenticatieState, projector);
}

export const getAuthenticatieBezig = authenticatieSelector(state => state.bezig);
export const getAuthenticatieCredentials = authenticatieSelector(state => state.credentials);
export const getAuthenticatieFout = authenticatieSelector(state => state.fout);
export const getAuthenticatieSession = authenticatieSelector(state => state.session);
