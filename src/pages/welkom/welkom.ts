import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginService} from '../../core/login.service';
import {Login} from '../../core/login';

/**
 * Generated class for the WelkomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welkom',
  templateUrl: 'welkom.html',
})
export class WelkomPage {

  login = <Login>{};
  fout = false;

  constructor(private navCtrl: NavController, private loginService: LoginService) {
  }

  inloggen() {
    this.loginService.submitLogin(this.login).subscribe(success => {
        if (success) {
          // naar home screen
          this.navCtrl.setRoot('PrikbordPage');
        } else {
          // foutmelding tonen
          this.fout = true;
        }
      }
    )
  }

  annuleren() {
    // naar home screen
    this.navCtrl.setRoot('PrikbordPage');
  }
}
