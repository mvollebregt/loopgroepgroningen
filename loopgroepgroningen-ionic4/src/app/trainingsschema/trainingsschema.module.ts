import {NgModule} from '@angular/core';
import {TrainingsschemaPageComponent} from './trainingsschema-page/trainingsschema-page.component';
import {SharedModule} from '../shared/shared/shared.module';
import {TrainingsschemaRoutingModule} from './trainingsschema-routing.module';

@NgModule({
  declarations: [
    TrainingsschemaPageComponent,
  ],
  imports: [
    TrainingsschemaRoutingModule,
    SharedModule
  ],
})
export class TrainingsschemaModule {
}
