import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NieuwsPage} from './nieuws';
import {NieuwslijstComponent} from './nieuwslijst/nieuwslijst.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NieuwsberichtenEffects} from './store/nieuwsberichten.effect';
import {nieuwsReducers} from './store/nieuws.reducers';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    NieuwsPage,
    NieuwslijstComponent
  ],
  imports: [
    IonicPageModule.forChild(NieuwsPage),
    SharedModule,
    StoreModule.forFeature('nieuws', nieuwsReducers),
    EffectsModule.forFeature([NieuwsberichtenEffects])
  ],
})
export class NieuwsPageModule {}
