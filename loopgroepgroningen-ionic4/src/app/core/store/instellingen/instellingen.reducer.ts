import {InstellingenState} from './instellingen.state';
import {InstellingenAction, InstellingenActionType} from './instellingen.action';

const initialInstellingenState: InstellingenState = {
  groep: 'A'
};

export function instellingenReducer(
  state = initialInstellingenState,
  action: InstellingenAction
): InstellingenState {

  switch (action.type) {
    case InstellingenActionType.ZetGroep:
      return {
        ...state,
        groep: action.groep
      };
  }

  return state;
}
