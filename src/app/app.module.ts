import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {CoreModule} from "../core/core.module";
import {CustomErrorHandler} from '../core/CustomErrorHandler';
import {SecureStorage} from '@ionic-native/secure-storage';
import {Firebase} from '@ionic-native/firebase';
import {SharedModule} from '../shared/shared.module';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

const environment = {
  development: false,
  production: true,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    IonicStorageModule.forRoot(),
    SharedModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    IonicErrorHandler,
    Firebase,
    SecureStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ]
})
export class AppModule {}
