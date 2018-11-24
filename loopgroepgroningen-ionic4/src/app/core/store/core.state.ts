import {InstellingenState} from './instellingen/instellingen.state';
import {AuthenticatieState} from './authenticatie/authenticatie.state';

export interface CoreState {
  authenticatie: AuthenticatieState;
  instellingen: InstellingenState;
}
