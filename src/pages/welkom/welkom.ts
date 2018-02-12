import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginService} from '../../core/login/login.service';
import {Login} from '../../core/login/login';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@IonicPage()
@Component({
  selector: 'page-welkom',
  templateUrl: 'welkom.html',
})
export class WelkomPage {

  login = <Login>{};
  meldingen: string[];

  constructor(private navCtrl: NavController, private loginService: LoginService) {
  }

  inloggen() {
    // TODO: ook opslaan in wachtwoordkluis (maar waar?)
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
