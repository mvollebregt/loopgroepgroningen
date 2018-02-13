import {ErrorHandler, Injectable} from '@angular/core';
import {AlertController, IonicErrorHandler} from 'ionic-angular';

export const CANCELLED = 'actie is geannuleerd door gebruiker';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(
    private alertController: AlertController,
    private ionicErrorHandler: IonicErrorHandler) {
  }

  handleError(error: any): void {
    if (error.message !== CANCELLED) {
      this.alertController.create({
        title: 'Fout',
        message: foutweergave(error),
        buttons: ['OK']
      }).present();
      this.ionicErrorHandler.handleError(error);
    }
  }
}

export function foutweergave(error: any) {
  return !error ? 'Onbekende fout' :
    Array.isArray(error) ? error.join('<br/>') :
      error.message ? error.message :
        error;
}
