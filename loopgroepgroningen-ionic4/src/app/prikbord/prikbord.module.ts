import {NgModule} from '@angular/core';
import {PrikbordPageComponent} from './prikbord-page/prikbord-page.component';
import {PrikbordRoutingModule} from './prikbord-routing.module';
import {SharedModule} from '../shared/shared/shared.module';
import {BerichtenModule} from '../shared/berichten/berichten.module';

@NgModule({
  imports: [
    PrikbordRoutingModule,
    BerichtenModule,
    SharedModule
  ],
  declarations: [
    PrikbordPageComponent
  ]
})
export class PrikbordModule { }
