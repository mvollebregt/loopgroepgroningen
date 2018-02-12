import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
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
    private loginService: LoginService,
    private navCtrl: NavController,
    private wachtwoordkluis: WachtwoordkluisService) {
  }

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
  }
}
