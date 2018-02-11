import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PrikbordService} from "../core/prikbord.service";
import * as moment from 'moment';
import {LoginService} from '../core/login/login.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) private nav: Nav;

  rootPage: string;

  pages = [
    {title: 'Prikbord', component: 'PrikbordPage', icon: 'chatboxes'},
    {title: 'Agenda', component: 'AgendaPage', icon: 'calendar'},
    {title: 'Trainingsschema', component: 'TrainingsschemaPage', icon: 'grid'},
    {title: 'Ledenlijst', component: 'LedenlijstPage', icon: 'contacts'},
  ];

  constructor(private loginService: LoginService,
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
    this.prikbordService.synchroniseer();
    this.loginService.heeftLogin().subscribe(heeftLogin => {
        this.rootPage = heeftLogin ? 'PrikbordPage' : 'WelkomPage'
      }
    );
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  private onPlatformResume(): void {
    this.prikbordService.synchroniseer();
  }
}
