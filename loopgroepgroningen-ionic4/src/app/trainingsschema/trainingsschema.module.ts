import {NgModule} from '@angular/core';
import {TrainingsschemaPageComponent} from './trainingsschema-page/trainingsschema-page.component';
import {SharedModule} from '../shared/shared/shared.module';
import {TrainingsschemaRoutingModule} from './trainingsschema-routing.module';
import {ListModule} from '../shared/list/list.module';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TrainingsschemaEffects} from './store/trainingsschema.effects';
import {trainingsschemaReducer} from './store/trainingsschema.reducer';
import {TrainingsschemaState} from '../trainingsschema/store/trainingsschema.state';
import {HerstelTrainingsschemaOpgeslagenState} from '../trainingsschema/store/trainingsschema.action';

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

  constructor(store: Store<TrainingsschemaState>) {
    store.dispatch(new HerstelTrainingsschemaOpgeslagenState());
  }

}
