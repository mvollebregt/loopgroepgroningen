import {instellingenReducer} from './instellingen/instellingen.reducer';
import {authenticatieReducer} from './authenticatie/authenticatie.reducer';

export const coreReducers = {
  authenticatie: authenticatieReducer,
  instellingen: instellingenReducer
};
