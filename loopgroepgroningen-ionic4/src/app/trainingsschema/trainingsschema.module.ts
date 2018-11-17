import {NgModule} from '@angular/core';
import {TrainingsschemaPageComponent} from './trainingsschema-page/trainingsschema-page.component';
import {SharedModule} from '../shared/shared/shared.module';
import {TrainingsschemaRoutingModule} from './trainingsschema-routing.module';
import {ListModule} from '../shared/list/list.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TrainingsschemaEffects} from './store/trainingsschema.effects';
import {trainingsschemaReducer} from './store/trainingsschema.reducer';

@NgModule({
  declarations: [
    TrainingsschemaPageComponent,
  ],
  imports: [
    TrainingsschemaRoutingModule,
    StoreModule.forFeature('trainingsschema', trainingsschemaReducer),
    EffectsModule.forFeature([TrainingsschemaEffects]),
    ListModule,
    SharedModule
  ],
})
export class TrainingsschemaModule {
}
