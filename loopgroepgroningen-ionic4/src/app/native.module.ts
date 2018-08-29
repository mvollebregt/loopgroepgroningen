import {NgModule} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SecureStorage} from '@ionic-native/secure-storage/ngx';

@NgModule({
  providers: [
    SecureStorage,
    StatusBar,
    SplashScreen,
    InAppBrowser
  ]
})
export class NativeModule {
}
