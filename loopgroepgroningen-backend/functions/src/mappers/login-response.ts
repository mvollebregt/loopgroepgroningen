import {LoginResponse} from '../api';
import {Element} from 'jsdom';

export function mapToLoginResponse(elements: Element[]): LoginResponse {

  let success = true;
  for (let button of elements) {
    const value = button.getAttribute('value');
    const text = button.textContent;
    if ((value && value.toLowerCase().indexOf('inloggen') > -1) ||
      (text && text.toLowerCase().indexOf('inloggen') > -1)) {
      success = false;
    }
  }
  return {success};

}

// const meldingen = this.extract('#system-message-container .warning li', node => node.textContent.trim(), false)(response);
// if (meldingen.length > 0) {
//   throw meldingen;
// }
