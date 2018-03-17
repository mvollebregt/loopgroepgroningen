import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {Observable} from "rxjs/Observable";
import {AlertController} from 'ionic-angular';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {CANCELLED, foutweergave} from '../CustomErrorHandler';
import {Login} from './login';
import {WachtwoordkluisService} from './wachtwoordkluis.service';
import {InstellingenService} from '../instellingen/instellingen.service';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {pipe} from 'rxjs/Rx';
import {of} from 'rxjs/observable/of';

@Injectable()
export class LoginService {

  constructor(private alertController: AlertController,
              private httpService: HttpService,
              private instellingenService: InstellingenService,
              private wachtwoordkluisService: WachtwoordkluisService) {
  }

  // TODO: bij wachten op inloggen iets van visuele feedback geven

  /**
   * Probeer in te loggen met de gegevens die zijn opgeslagen in de wachtwoordkluis.
   * Indien dat mislukt, wordt promptLogin aangeroepen om een nieuwe login te vragen en daarna volgt een nieuwe
   * inlogpoging, net zolang totdat de inlogpoging lukt, of totdat de gebruiker het inloggen annuleert.
   * Wanneer het inloggen is gelukt, wordt de Observable beeindigd. Als de gebruiker heeft geannuleerd komt er een
   * Observable.error(CANCELLED) terug.
   */
  login(): Observable<{}> {
    return this.wachtwoordkluisService.haalLoginOp().pipe(
      switchMap((login: Login) => this.probeerLogin(login)));
  }

  // Submit de login naar de website.
  // De observable geeft een lijst van meldingen terug als er iets is misgegaan, of null als het inloggen is gelukt.
  submitLogin(login: Login): Observable<{}> {
    return this.httpService.get('index.php/loopgroep-groningen-ledeninfo').pipe(
      this.checkIngelogd(),
      switchMap(([ingelogd, response]) => {
        if (ingelogd) {
          return of(null);
        } else {
          return of(response).pipe(
            this.httpService.postAfterGet(
              'index.php/loopgroep-groningen-ledeninfo',
              '#login-form',
              {
                username: (login && login.username) || '',
                password: (login && login.password) || ''
              }),
            this.checkIngelogd(),
            tap(([ingelogd, ]) => {
              if (!ingelogd) {
                throw ['Het inloggen is mislukt.'];
              }
            })
          );
        }
      }),
      tap(() => this.instellingenService.setInstellingen({ingelogd: true})),
      map(() => null)
    )
  }

  private probeerLogin(login: Login): Observable<{}> {
    return this.submitLogin(login).pipe(
      catchError(meldingen => {
        return this.promptLogin(login, meldingen).pipe(
          tap((login: Login) => this.wachtwoordkluisService.slaLoginOp(login)),
          switchMap((login: Login) => this.probeerLogin(login)));
      }));
  }

  private checkIngelogd() {
    return pipe(
      this.httpService.extractWithRetryKeepingResponse('button, input[type="submit"]', node => node),
      map(([buttons, response]) => {
        let loggedIn = true;
        for (let button of buttons) {
          const value = (<Element> button).getAttribute('value');
          const text = (<Element> button).textContent;
          if ((value && value.toLowerCase().indexOf('inloggen') > -1) ||
            (text && text.toLowerCase().indexOf('inloggen') > -1)) {
            loggedIn = false;
          }
        }
        return [loggedIn, response];
    }))
  }

  // Toont een login prompt die vraagt om gebruikers en wachtwoord.
  // De observable geeft een Login-object terug als de gebruiker op de inloggen-knop drukt.
  // De observable gooit een error CANCELED als de gebruiker op Annuleren drukt.
  private promptLogin(login: Login, meldingen: string[]): Observable<Login> {
    const observable = new ReplaySubject<Login>();
    const alert = this.alertController.create({
      title: 'Inloggen',
      message: foutweergave(meldingen),
      inputs: [
        {name: 'username', placeholder: 'Gebruikersnaam', value: login ? login.username : ''},
        {name: 'password', placeholder: 'Wachtwoord', type: 'password', value: login ? login.password : ''}
      ],
      buttons: [
        {
          text: 'Annuleren', handler: () => {
            alert.dismiss();
            observable.error(CANCELLED)
          }
        },
        {text: 'Inloggen', handler: login => observable.next(login)}
      ]
    });
    alert.present();
    return observable;
  }
}
