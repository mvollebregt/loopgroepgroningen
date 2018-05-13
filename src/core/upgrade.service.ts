import {Injectable} from '@angular/core';
import {InstellingenService} from './instellingen/instellingen.service';
import {catchError, filter, finalize, pluck, switchMap, take, tap} from 'rxjs/operators';
import {SecureStorage, SecureStorageObject} from '@ionic-native/secure-storage';
import {Login} from './login/login';
import {LoginService} from './login/login.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {WachtwoordkluisService} from './login/wachtwoordkluis.service';

@Injectable()
export class UpgradeService {

  constructor(private instellingenService: InstellingenService,
              private loginService: LoginService,
              private secureStorage: SecureStorage,
              private wachtwoordkluis: WachtwoordkluisService) {
  }

  upgrade(): Observable<{}> {
    return this.instellingenService.getInstellingen().pipe(
      pluck('ingelogd'),
      take(1),
      filter(ingelogd => !ingelogd),
      switchMap(this.haalLoginOpV1.bind(this)),
      filter(login => !!login),
      tap(this.wachtwoordkluis.slaLoginOp),
      switchMap((login: Login) => this.loginService.submitLogin(login)),
      catchError(() => of(null)),
      finalize(this.clearOudeSecureStorage.bind(this))
    )
  }

  private async haalLoginOpV1(): Promise<Login> {
    const storage = await this.getOudeSecureStorage();
    const username = await storage.get('username');
    const password = await storage.get('password');
    return username && password ? {username, password} : null;
  }

  private async clearOudeSecureStorage() {
    const storage = await this.getOudeSecureStorage();
    return storage.clear();
  }

  private async getOudeSecureStorage(): Promise<SecureStorageObject> {
    return await this.secureStorage.create('');
  }
}
