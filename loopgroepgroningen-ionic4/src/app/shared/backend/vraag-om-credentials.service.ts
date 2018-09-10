import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Credentials} from '../../api';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class VraagOmCredentialsService {


  constructor(private alertController: AlertController) {
  }

  private static foutweergave(err: HttpErrorResponse) {
    return `<span class="error">${err.error.meldingen.join('<br>')}</span>`;
  }

  // Toont een login prompt die vraagt om gebruikers en wachtwoord.
  // De observable geeft een Credentials-object terug als de gebruiker op de inloggen-knop drukt.
  // De observable geeft geen waarde terug (maar termineert wel) als de gebruiker op Annuleren drukt.
  vraagOmCredentials(credentials: Credentials, err: HttpErrorResponse): Observable<Credentials> {
    const credentialsListener = new ReplaySubject<Credentials>();
    this.presentAlert(credentials, VraagOmCredentialsService.foutweergave(err), credentialsListener);
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
        {text: 'Annuleren', cssClass: 'secondary'},
        {text: 'Inloggen', handler: login => credentialsListener.next(login)}
      ]
    });
    alert.onDidDismiss().then(() => credentialsListener.complete());
    await alert.present();
  }
}
