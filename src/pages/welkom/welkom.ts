import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {LoginService} from '../../core/login/login.service';
import {Login} from '../../core/login/login';
import {WachtwoordkluisService} from '../../core/login/wachtwoordkluis.service';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-welkom',
  templateUrl: 'welkom.html',
})
export class WelkomPage {

  login = <Login>{};
  meldingen: string[];
  aanHetInloggen = false;

  constructor(private alertController: AlertController,
              private loginService: LoginService,
              private navCtrl: NavController,
              private wachtwoordkluis: WachtwoordkluisService) {
  }

  inloggen() {
    this.aanHetInloggen = true;
    this.wachtwoordkluis.slaLoginOp(this.login);
    this.loginService.submitLogin(this.login).pipe(
      catchError(error => {
        this.aanHetInloggen = false;
        return of([error]);
      })
    ).subscribe(meldingen => {
      if (!meldingen) {
        this.navCtrl.setRoot('PrikbordPage');
      } else {
        this.meldingen = <string[]> meldingen;
      }
    });
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
