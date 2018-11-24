import {Module} from './module';

export interface Session {
  toegestaneModules?: Module[];
  alleenLezen?: boolean;
}
