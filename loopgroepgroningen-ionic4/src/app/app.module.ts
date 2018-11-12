import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import * as moment from 'moment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NativeModule} from './native.module';
import {VegetableJarService} from './shared/backend/vegetable-jar.service';
import {CoreModule} from './core/core.module';

moment.locale('nl');

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NativeModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: VegetableJarService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
