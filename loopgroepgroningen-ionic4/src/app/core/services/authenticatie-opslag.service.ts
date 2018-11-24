import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {SecureStorage} from '@ionic-native/secure-storage/ngx';
import {AuthenticatieState} from '../store/authenticatie/authenticatie.state';

@Injectable({providedIn: 'root'})
export class AuthenticatieOpslagService {

  private static readonly storeName = 'loopgroep-groningen';
  private static readonly key = 'authenticatie';

  constructor(private secureStorage: SecureStorage) {
  }

  getOpgeslagenAuthenticatie(): Observable<AuthenticatieState> {
    return from((async () => {
      const storage = await this.secureStorage.create(AuthenticatieOpslagService.storeName);
      if (storage) {
        // Als we van een lege store een key opvragen crasht cordova. Dit is een workaround.
        await storage.set('bogus', 'bogus');
        const keys = await storage.keys();
        if (keys.indexOf(AuthenticatieOpslagService.key) > -1) {
          const value = await storage.get(AuthenticatieOpslagService.key);
          return JSON.parse(value);
        }
      }
      return null;
    })());
  }

  setOpgeslagenAuthenticatie(authenticatie: AuthenticatieState) {
    return from((async () => {
      const storage = await this.secureStorage.create(AuthenticatieOpslagService.storeName);
      if (storage) {
        storage.set(AuthenticatieOpslagService.key, JSON.stringify(this.getOpTeSlaan(authenticatie)));
      }
    })());
  }

  private getOpTeSlaan(authenticatie: AuthenticatieState): Partial<AuthenticatieState> {
    return {
      ingelogd: authenticatie.ingelogd,
      credentials: authenticatie.credentials,
      vegetables: authenticatie.vegetables
    };
  }

}
