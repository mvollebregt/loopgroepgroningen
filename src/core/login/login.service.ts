import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {Observable} from "rxjs/Observable";
import {AlertController} from 'ionic-angular';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {CANCELLED} from '../CustomErrorHandler';
import {Login} from './login';
import {WachtwoordkluisService} from './wachtwoordkluis.service';
import {InstellingenService} from '../instellingen/instellingen.service';

@Injectable()
export class LoginService {

  constructor(
    private alertController: AlertController,
    private httpService: HttpService,
    private instellingenService: InstellingenService,
    private wachtwoordkluisService: WachtwoordkluisService) {
  }

  /**
   * Probeer in te loggen met de gegevens die zijn opgeslagen in de wachtwoordkluis.
   * Indien dat mislukt, wordt promptLogin aangeroepen om een nieuwe login te vragen en daarna volgt een nieuwe
   * inlogpoging, net zolang totdat de inlogpoging lukt, of totdat de gebruiker het inloggen annuleert.
   * Wanneer het inloggen is gelukt, wordt de Observable beeindigd. Als de gebruiker heeft geannuleerd komt er een
   * Observable.error(CANCELLED) terug.
   */
  login(): Observable<void> {
    return this.wachtwoordkluisService.haalLoginOp()
      .switchMap(login => this.probeerLogin(login));
  }

  // Submit de login naar de website.
  // De observable geeft een lijst van meldingen terug als er iets is misgegaan, of null als het inloggen is gelukt.
  submitLogin(login: Login): Observable<string[]> {
    // TODO: iets van visuele feedback geven dat de login aan de gang is
    return this.httpService
      .post(
        'index.php/loopgroep-groningen-ledeninfo',
        '#login-form',
        {
          username: (login && login.username) || '',
          password: (login && login.password) || ''
        }, null,
        formData => formData.hasOwnProperty('username') // TODO: zelfde check als bij checkInlogFoutmeldingen
      )
      .map(response => this.checkInlogFoutmeldingen(response))
      .do(meldingen => {
        if (!meldingen) {
          this.instellingenService.setInstellingen({ingelogd: true})
        }
      });
  }

  private probeerLogin(login: Login): Observable<void> {
    return this.submitLogin(login)
      .switchMap(meldingen => {
        if (!meldingen) {
          return Observable.of(null);
        } else {
          return this.promptLogin(login, meldingen)
            .do(login => this.wachtwoordkluisService.slaLoginOp(login))
            .switchMap(login => this.probeerLogin(login))
        }
      });
  }

  private checkInlogFoutmeldingen(response: string): string[] {
    // is er nog ergens een inlogbutton?
    let meldingen;
    const buttons = this.httpService.extract('button', node => node.textContent)(response);
    // TODO: input type=submit komt ook voor!
    let loggedIn = true;
    for (let button of buttons) {
      if (button.toLowerCase().indexOf('inloggen') > -1) {
        loggedIn = false;
      }
    }
    if (!loggedIn) {
      // zoek naar meldingen op de pagina zelf
      meldingen = this.httpService.extract('.warning li', node => node.textContent.trim())(response);
      if (meldingen.length === 0) {
        meldingen = ['Het inloggen is mislukt.'];
      }
    }
    return meldingen;
  }

  // Toont een login prompt die vraagt om gebruikers en wachtwoord.
  // De observable geeft een Login-object terug als de gebruiker op de inloggen-knop drukt.
  // De observable gooit een error CANCELED als de gebruiker op Annuleren drukt.
  private promptLogin(login: Login, meldingen: string[]) : Observable<Login> {
    const observable = new ReplaySubject<Login>();
    const alert = this.alertController.create({
      title: 'Inloggen',
      message: meldingen.join('<br/>'),
      inputs: [
        {name: 'username', placeholder: 'Gebruikersnaam', value: login ? login.username: ''},
        {name: 'password', placeholder: 'Wachtwoord', type: 'password', value: login ? login.password: ''}
      ],
      buttons: [
        {text: 'Annuleren', handler: () => { alert.dismiss(); observable.error(CANCELLED)}},
        {text: 'Inloggen', handler: login => observable.next(login)}
      ]
    });
    alert.present();
    return observable;
  }
}
