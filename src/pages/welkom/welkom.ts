import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginService} from '../../core/login/login.service';
import {Login} from '../../core/login/login';
import {CANCELLED} from '../../core/CustomErrorHandler';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Subject} from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-welkom',
  templateUrl: 'welkom.html',
})
export class WelkomPage implements OnInit {

  observable: Subject<Login>;
  login = <Login>{};
  meldingen: string[];

  constructor(private navCtrl: NavController, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.login((login, meldingen) => this.promptLogin(login, meldingen))
      .catch(error => {
        if (error == CANCELLED) {
          return Observable.of(null);
        } else {
          // this.fout = true;
          return Observable.throw(error);
        }
      })
      .subscribe(() => this.navCtrl.setRoot('PrikbordPage')
    );
  }

  promptLogin(login: Login = null, meldingen: string[] = null): Observable<Login> {
    this.observable = new ReplaySubject<Login>();
    this.meldingen = meldingen;
    return this.observable;
  }

  inloggen() {
    this.observable.next(this.login);
  }

  annuleren() {
    this.observable.error(CANCELLED);
  }
}
