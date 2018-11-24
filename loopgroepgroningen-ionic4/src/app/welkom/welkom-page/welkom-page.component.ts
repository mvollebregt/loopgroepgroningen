import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LogIn} from '../../core/store/authenticatie/authenticatie.action';
import {CoreState} from '../../core/store/core.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Credentials} from '../../api';
import {
  getAuthenticatieBezig,
  getAuthenticatieCredentials,
  getAuthenticatieFout,
  getAuthenticatieSession
} from '../../core/store/authenticatie/authenticatie.state';
import {filter, take, tap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {anonymousUserCredentials} from '../../core/backend/models/anonymous-user-credentials';
import {Fout} from '../../core/backend/models/fout';

@Component({
  selector: 'lg-welkom-page',
  templateUrl: 'welkom-page.component.html',
  styleUrls: ['welkom-page.component.scss']
})
export class WelkomPageComponent implements OnInit {

  loginForm: FormGroup;
  credentials: Observable<Credentials>;
  bezig: Observable<boolean>;
  fout: Observable<Fout>;

  constructor(private alertController: AlertController,
              private location: Location,
              private fb: FormBuilder,
              private router: Router,
              private store: Store<CoreState>
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({username: [''], password: ['']});
    this.credentials = this.store.pipe(
      select(getAuthenticatieCredentials),
      filter(credentials => credentials && credentials.username !== 'anonymous'));
    this.bezig = this.store.pipe(select(getAuthenticatieBezig));
    this.fout = this.store.pipe(select(getAuthenticatieFout));
  }

  inloggen() {
    this.store.dispatch(new LogIn(this.loginForm.value));
    this.gaVerderNaSuccesvolleInlog();
  }

  annuleren() {
    this.store.dispatch(new LogIn(anonymousUserCredentials));
    this.gaVerderNaSuccesvolleInlog();
    this.toonAnnuleerLoginAlert();
  }

  private gaVerderNaSuccesvolleInlog() {
    this.store.pipe(
      select(getAuthenticatieSession),
      filter(session => !!session),
      take(1),
      tap(() => this.gaVerder())
    ).subscribe();
  }

  private gaVerder() {
    if (this.location.path().indexOf('welkom') > -1) {
      this.router.navigate(['prikbord'], {replaceUrl: true});
    } else {
      this.router.navigate([this.location.path()], {skipLocationChange: true});
    }
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
