import {Component} from '@angular/core';
import {Credentials} from '../../api';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'lg-welkom-page',
  templateUrl: 'welkom-page.component.html',
  styleUrls: ['welkom-page.component.scss']
})
export class WelkomPageComponent {

  login = <Credentials>{};
  meldingen: string[];
  aanHetInloggen = false;

  constructor(private alertController: AlertController,
              //             private loginService: LoginService,
              //             private navCtrl: NavController,
              //             private wachtwoordkluis: WachtwoordkluisService
  ) {
  }

  inloggen() {
    this.aanHetInloggen = true;
    // this.wachtwoordkluis.slaLoginOp(this.login);
    // this.loginService.submitLogin(this.login).pipe(
    //   catchError(error => {
    //     this.aanHetInloggen = false;
    //     return of([error]);
    //   })
    // ).subscribe(meldingen => {
    //   if (!meldingen) {
    //     this.navCtrl.setRoot('PrikbordPage');
    //   } else {
    //     this.meldingen = <string[]> meldingen;
    //   }
    // });
  }

  async annuleren() {
    // this.navCtrl.setRoot('PrikbordPage');
    const alert = await this.alertController.create({
      header: 'Niet ingelogd',
      message: `Omdat je niet bent ingelogd, kun je alleen het prikbord en de agenda bekijken. Voor volledige toegang 
      ga je naar 'Inloggen' in het menu.`,
      buttons: ['OK']
    });
    alert.present();
  }
}
