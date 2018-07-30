import { NgModule } from '@angular/core';
import { PrikbordPageComponent } from './prikbord-page/prikbord-page.component';
import {PrikbordRoutingModule} from './prikbord-routing.module';
import {SharedModule} from '../shared/shared/shared.module';
import {PoorContentComponent} from './poor-content/poor-content.component';

@NgModule({
  imports: [
    PrikbordRoutingModule,
    SharedModule
  ],
  declarations: [
    PoorContentComponent,
    PrikbordPageComponent
  ]
})
export class PrikbordModule { }
