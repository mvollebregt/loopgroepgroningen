import {NgModule} from '@angular/core';
import {Store, StoreModule} from '@ngrx/store';
import {coreReducers} from './store/core.reducer';
import {EffectsModule} from '@ngrx/effects';
import {coreEffects} from './store/core.effects';
import {CoreState} from './store/core.state';
import {HerstelInstellingenOpgeslagenState} from './store/instellingen/instellingen.action';

@NgModule({
  imports: [
    StoreModule.forFeature('core', coreReducers),
    EffectsModule.forFeature(coreEffects)
  ]
})
export class CoreModule {

  constructor(store: Store<CoreState>) {
    store.dispatch(new HerstelInstellingenOpgeslagenState());
  }

}
