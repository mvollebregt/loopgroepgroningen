import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginService} from '../../core/login.service';
import {Login} from '../../core/login';
import {CANCELLED} from '../../core/CustomErrorHandler';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@IonicPage()
@Component({
  selector: 'page-welkom',
  templateUrl: 'welkom.html',
})
export class WelkomPage implements OnInit {

  observable: ReplaySubject<Login>;
  login = <Login>{};
  fout = false;

  constructor(private navCtrl: NavController, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.login(() => this.promptLogin())
      .catch(error => {
        if (error == CANCELLED) {
          return Observable.of(null);
        } else {
          // TODO: dit werkt niet op deze plek! (zie loginservice)
          this.fout = true;
          return Observable.throw(error);
        }
      })
      .subscribe(() => this.navCtrl.setRoot('PrikbordPage')
    );
  }

  promptLogin(): Observable<Login> {
    this.observable = new ReplaySubject<Login>();
    return this.observable;
  }

  inloggen() {
    this.observable.next(this.login);
  }

  annuleren() {
    this.observable.error(CANCELLED);
  }
}
