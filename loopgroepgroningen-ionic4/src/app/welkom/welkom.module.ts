import {NgModule} from '@angular/core';
import {WelkomRoutingModule} from './welkom-routing.module';
import {WelkomPageComponent} from './welkom-page/welkom-page.component';
import {SharedModule} from '../shared/shared/shared.module';

@NgModule({
  declarations: [
    WelkomPageComponent,
  ],
  imports: [
    WelkomRoutingModule,
    SharedModule
  ],
})
export class WelkomModule {
}
