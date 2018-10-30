import {NgModule} from '@angular/core';
import {TrainingsschemaPageComponent} from './trainingsschema-page/trainingsschema-page.component';
import {SharedModule} from '../shared/shared/shared.module';
import {TrainingsschemaRoutingModule} from './trainingsschema-routing.module';
import {ListModule} from '../shared/list/list.module';

@NgModule({
  declarations: [
    TrainingsschemaPageComponent,
  ],
  imports: [
    TrainingsschemaRoutingModule,
    ListModule,
    SharedModule
  ],
})
export class TrainingsschemaModule {
}
