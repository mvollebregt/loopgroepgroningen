import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {LoginService} from '../../core/login/login.service';
import {Login} from '../../core/login/login';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {WachtwoordkluisService} from '../../core/login/wachtwoordkluis.service';

@IonicPage()
@Component({
  selector: 'page-welkom',
  templateUrl: 'welkom.html',
})
export class WelkomPage {

  login = <Login>{};
  meldingen: string[];

  constructor(
    private alertController: AlertController,
    private loginService: LoginService,
    private navCtrl: NavController,
    private wachtwoordkluis: WachtwoordkluisService) {
  }

  // TODO: testen of submit-knoppen ook zichtbaar blijven boven toetsenbord bij oud (klein) model iPhone

  inloggen() {
    this.wachtwoordkluis.slaLoginOp(this.login);
    this.loginService.submitLogin(this.login)
      .catch(error => Observable.of([error]))
      .subscribe(meldingen => {
        if (!meldingen) {
          this.navCtrl.setRoot('PrikbordPage');
        } else {
          this.meldingen = meldingen;
        }
      })
  }

  annuleren() {
    this.navCtrl.setRoot('PrikbordPage');
    this.alertController.create({
      title: 'Niet ingelogd',
      message: `Omdat je niet bent ingelogd, kun je alleen het prikbord en de agenda bekijken. Voor volledige toegang 
      ga je naar 'Inloggen' in het menu.`,
      buttons: ['OK']
    }).present();
  }
}
