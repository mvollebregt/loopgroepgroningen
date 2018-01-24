import {ErrorHandler, Injectable} from '@angular/core';
import {IonicErrorHandler} from 'ionic-angular';

export const CANCELLED = 'actie is geannuleerd door gebruiker';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private ionicErrorHandler: IonicErrorHandler) {
  }

  handleError(error: any): void {
    if (error.message !== CANCELLED) {
      this.ionicErrorHandler.handleError(error);
    }
  }
}
