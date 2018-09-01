import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {from, Observable, of} from 'rxjs'
import {Credentials} from '../../../api';
import {SecureStorage} from '@ionic-native/secure-storage/ngx';

const STORE_NAME = 'loopgroep-groningen';
const LOGIN_KEY = 'login';

@Injectable({providedIn: 'root'})
export class WachtwoordkluisService {

  private login: Credentials;

  constructor(private secureStorage: SecureStorage, private platform: Platform) {
  }

  haalCredentialsOp(): Observable<Credentials> {
    if (this.platform.is('cordova')) {
      return from(
        this.secureStorage.create(STORE_NAME).then(
          storage => storage.get(LOGIN_KEY),
        ).then(
          login => JSON.parse(login),
          () => null
        ));
    } else {
      return of(this.login);
    }
  }

  slaCredentialsOp(login: Credentials) {
    if (this.platform.is('cordova')) {
      this.secureStorage.create(STORE_NAME).then(
        storage => storage.set(LOGIN_KEY, JSON.stringify(login)));
    } else {
      this.login = login;
    }
  }
}
