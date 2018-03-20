import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PrikbordService} from "../core/prikbord.service";
import * as moment from 'moment';
import {InstellingenService} from '../core/instellingen/instellingen.service';
import {Firebase} from '@ionic-native/firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) private nav: Nav;

  rootPage: string;
  pages = [];

  token = '';

  constructor(private instellingenService: InstellingenService,
              private firebase: Firebase,
              private platform: Platform,
              private prikbordService: PrikbordService,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
    this.platform.ready().then(() => this.onPlatformReady());
    this.platform.resume.subscribe(() => this.onPlatformResume());
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private onPlatformReady(): void {
    moment.locale('nl');
    this.instellingenService.getInstellingen().subscribe(instellingen =>
      this.ingelogdGewijzigd(instellingen.ingelogd));
    this.prikbordService.synchroniseer();
    this.instellingenService.getInstellingen()
      .subscribe(instellingen => {
          this.rootPage = instellingen.ingelogd ? 'PrikbordPage' : 'WelkomPage'
        }
      );
    this.statusBar.styleDefault();
    this.splashScreen.hide();


    // this.firebase.getToken().then(token => this.token = token);
    // if (this.platform.is('iOS')) {
    // TODO: dit pas na het inloggen ofzo?
    this.firebase.grantPermission();
  // }
  }

  private onPlatformResume(): void {
    this.prikbordService.synchroniseer();
  }

  private ingelogdGewijzigd(ingelogd: boolean) {
    this.pages = [];
    this.pages.push({title: 'Prikbord', component: 'PrikbordPage', icon: 'chatboxes'});
    this.pages.push({title: 'Agenda', component: 'AgendaPage', icon: 'calendar'});
    if (ingelogd) {
      this.pages.push({title: 'Trainingsschema', component: 'TrainingsschemaPage', icon: 'grid'});
      this.pages.push({title: 'Ledenlijst', component: 'LedenlijstPage', icon: 'contacts'});
    } else {
      this.pages.push({title: 'Inloggen', component: 'WelkomPage', icon: 'log-in'});
    }
  }
}
