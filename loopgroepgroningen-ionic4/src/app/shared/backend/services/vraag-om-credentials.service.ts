import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Credentials} from '../../../api';

@Injectable({providedIn: 'root'})
export class VraagOmCredentialsService {


  constructor(private alertController: AlertController) {
  }

  // Toont een login prompt die vraagt om gebruikers en wachtwoord.
  // De observable geeft een Credentials-object terug als de gebruiker op de inloggen-knop drukt.
  // De observable geeft null terug als de gebruiker op Annuleren drukt.
  vraagOmCredentials(credentials: Credentials, melding: string): Observable<Credentials> {
    const credentialsListener = new ReplaySubject<Credentials>();
    this.presentAlert(credentials, melding, credentialsListener);
    return credentialsListener;
  }

  private async presentAlert(credentials: Credentials, melding: string, credentialsListener: Subject<Credentials>) {
    const alert = await this.alertController.create({
      header: 'Inloggen',
      message: melding,
      inputs: [
        {name: 'username', placeholder: 'Gebruikersnaam', type: 'text', value: credentials ? credentials.username : ''},
        {name: 'password', placeholder: 'Wachtwoord', type: 'password', value: credentials ? credentials.password : ''}
      ],
      buttons: [
        {
          text: 'Annuleren', handler: () => {
            alert.dismiss();
            credentialsListener.next(null);
            credentialsListener.complete();
          }
        },
        {
          text: 'Inloggen', handler: login => {
            credentialsListener.next(login);
            credentialsListener.complete();
          }
        }
      ]
    });
    // TODO: als je de alert wegklikt door buiten de alert te klikken wordt de credentialsListener nooit gecomplete!
    // (en word je de tweede keer niet meer gevraagd om je wachtwoord)
    await alert.present();
  }

}
