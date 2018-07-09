import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NieuwsoverzichtPage} from './nieuwsoverzicht.page';
import {NieuwsberichtenLijstComponent} from './nieuwsberichten-lijst/nieuwsberichten-lijst.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NieuwsberichtenEffects} from './store/nieuwsberichten.effect';
import {nieuwsReducers} from './store/nieuws.reducers';
import {SharedModule} from '../../shared/shared.module';
import {NieuwsClient} from './shared/nieuws.client';

@NgModule({
  declarations: [
    NieuwsoverzichtPage,
    NieuwsberichtenLijstComponent
  ],
  imports: [
    IonicPageModule.forChild(NieuwsoverzichtPage),
    SharedModule,
    StoreModule.forFeature('nieuws', nieuwsReducers),
    EffectsModule.forFeature([NieuwsberichtenEffects])
  ],
  providers: [
    NieuwsClient
  ]
})
export class NieuwsoverzichtPageModule {}
