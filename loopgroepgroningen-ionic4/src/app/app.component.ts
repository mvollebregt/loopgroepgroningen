import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'lg-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Nieuws',
      url: '/nieuws',
      icon: 'paper'
    },
    {
      title: 'Prikbord',
      url: '/prikbord',
      icon: 'chatboxes'
    },
    {
      title: 'Agenda',
      url: '/agenda',
      icon: 'calendar'
    }, {
      title: 'Trainingsschema',
      url: '/trainingsschema',
      icon: 'grid'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
