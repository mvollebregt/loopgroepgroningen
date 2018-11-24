import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {from, Observable, of} from 'rxjs';
import {Credentials} from '../../api';
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
      return from(this.haalCredentialsPromiseOp());
    } else {
      return of(this.login);
    }
  }

  private async haalCredentialsPromiseOp(): Promise<Credentials> {
    const storage = await this.secureStorage.create(STORE_NAME);
    // Als we van een lege store een key opvragen crasht cordova. Dit is een workaround.
    await storage.set('bogus', 'bogus');
    const keys = await storage.keys();
    if (keys.indexOf(LOGIN_KEY) > -1) {
      const value = await storage.get(LOGIN_KEY);
      return JSON.parse(value);
    } else {
      return null;
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
