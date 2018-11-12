import {SettingsState} from './settings.state';
import {SettingsAction, SettingsActionType} from './settings.action';

const initialSettingsState: SettingsState = {
  groep: 'A'
};

export function settingsReducer(
  state = initialSettingsState,
  action: SettingsAction
): SettingsState {

  switch (action.type) {
    case SettingsActionType.ZetGroep:
      return {
        ...state,
        groep: action.groep
      };
  }

  return state;
}
