import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import * as moment from 'moment';
import {PrikbordPage} from "../pages/prikbord/prikbord";
import {PrikbordService} from "../core/prikbord.service";
import {AgendaPage} from "../pages/agenda/agenda";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) private nav: Nav;

  rootPage: any = 'PrikbordPage';

  // TODO: lazy loading
  pages = [
    {title: 'Prikbord', component: 'PrikbordPage'},
    {title: 'Agenda', component: 'AgendaPage'},
    {title: 'Home', component: HomePage},
    {title: 'List', component: ListPage}
  ];

  constructor(private platform: Platform,
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
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    moment.locale('nl');
    this.prikbordService.synchroniseer();
  }

  private onPlatformResume(): void {
    this.prikbordService.synchroniseer();
  }
}
