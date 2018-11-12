import {NgModule} from '@angular/core';
import {PrikbordPageComponent} from './prikbord-page/prikbord-page.component';
import {PrikbordRoutingModule} from './prikbord-routing.module';
import {SharedModule} from '../shared/shared/shared.module';
import {BerichtenModule} from '../shared/berichten/berichten.module';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {prikbordReducer} from './store/prikbord.reducer';
import {PrikbordEffects} from './store/prikbord.effect';
import {PrikbordState} from './store/prikbord.state';
import {HerstelPrikbordOpgeslagenState} from './store/prikbord.action';

@NgModule({
  imports: [
    PrikbordRoutingModule,
    BerichtenModule,
    StoreModule.forFeature('prikbord', prikbordReducer),
    EffectsModule.forFeature([PrikbordEffects]),
    SharedModule
  ],
  declarations: [
    PrikbordPageComponent
  ]
})
export class PrikbordModule {

  constructor(store: Store<PrikbordState>) {
    store.dispatch(new HerstelPrikbordOpgeslagenState());
  }

}
