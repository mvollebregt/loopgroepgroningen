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
      const message = Array.isArray(error) ? error.join('<br/>') : error;
      this.alertController.create({
        title: 'Fout',
        message: message,
        buttons: ['OK']
      }).present();
      this.ionicErrorHandler.handleError(error);
    }
  }
}
