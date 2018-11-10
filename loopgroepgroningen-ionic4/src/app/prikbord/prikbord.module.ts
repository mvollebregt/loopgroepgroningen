import {NgModule} from '@angular/core';
import {PrikbordPageComponent} from './prikbord-page/prikbord-page.component';
import {PrikbordRoutingModule} from './prikbord-routing.module';
import {SharedModule} from '../shared/shared/shared.module';
import {BerichtenModule} from '../shared/berichten/berichten.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {prikbordReducer} from './store/prikbord.reducer';
import {PrikbordEffects} from './store/prikbord.effect';

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
export class PrikbordModule { }
