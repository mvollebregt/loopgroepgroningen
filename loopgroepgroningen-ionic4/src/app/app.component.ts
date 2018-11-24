import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {CoreState} from './core/store/core.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {hoofdmenuitems, Menuitem} from './app-routing.module';
import {getAuthenticatieSession} from './core/store/authenticatie/authenticatie.state';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lg-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  toegestanePaginas: Observable<Menuitem[]>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<CoreState>
  ) {
  }

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.toegestanePaginas = this.store.pipe(
      select(getAuthenticatieSession),
      map(session => session && session.toegestaneModules ?
        hoofdmenuitems.filter(item => session.toegestaneModules.indexOf(item.path) > -1) :
        hoofdmenuitems
      )
    );
  }
}
