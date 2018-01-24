import {Injectable} from '@angular/core';
import {SecureStorage} from '@ionic-native/secure-storage';
import {Observable} from 'rxjs/Observable';
import {Login} from './login';
import 'rxjs/add/observable/fromPromise'
import {Platform} from 'ionic-angular';

const STORE_NAME = 'loopgroep-groningen';
const LOGIN_KEY = 'login';

@Injectable()
export class WachtwoordkluisService {

  private login: Login;

  constructor(private secureStorage: SecureStorage, private platform: Platform) {
  }

  haalLoginOp(): Observable<Login>{
    if (this.platform.is('cordova')) {
      return Observable.fromPromise(
        this.secureStorage.create(STORE_NAME).then(
          storage => storage.get(LOGIN_KEY)
        ).then(
          login => JSON.parse(login)
        ));
    } else {
      return Observable.of(this.login);
    }
  }

  slaLoginOp(login: Login) {
    if (this.platform.is('cordova')) {
      this.secureStorage.create(STORE_NAME).then(
        storage => storage.set(LOGIN_KEY, JSON.stringify(login)));
    } else {
      this.login = login;
    }
  }
}
