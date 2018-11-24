import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'lg-welkom-page',
  templateUrl: 'welkom-page.component.html',
  styleUrls: ['welkom-page.component.scss']
})
export class WelkomPageComponent implements OnInit {

  loginForm: FormGroup;
  meldingen: string[];
  aanHetInloggen = false;

  constructor(private alertController: AlertController,
              // private store: Store<AuthenticatieState>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        username: [''],
        password: ['']
      }
    );
    // this.aanHetInloggen = this.store.pipe(select(getAuthenticatieInlogstatus));
  }

  inloggen() {
    // this.store.dispatch(new LogIn(this.loginForm.value));
  }

  annuleren() {
    // this.store.dispatch(new AnnuleerLogin());
    this.toonAnnuleerLoginAlert();
  }

  private async toonAnnuleerLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Niet ingelogd',
      message: `Omdat je niet bent ingelogd, kun je alleen het prikbord en de agenda bekijken. Voor volledige toegang
      ga je naar 'Inloggen' in het menu.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
