import {NieuwsClient} from './shared/nieuws.client';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {nieuwsReducers} from './store/nieuws.reducers';
import {NieuwsberichtenEffects} from './store/nieuwsberichten.effect';
import {NieuwsberichtenLijstComponent} from './nieuwsberichten-lijst/nieuwsberichten-lijst.component';
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {IonicModule} from 'ionic-angular';
import {NieuwsberichtDetailComponent} from './nieuwsbericht-detail/nieuwsbericht-detail.component';

@NgModule({
  declarations: [
    NieuwsberichtDetailComponent,
    NieuwsberichtenLijstComponent
  ],
  exports: [
    NieuwsberichtDetailComponent,
    NieuwsberichtenLijstComponent
  ],
  imports: [
    StoreModule.forFeature('nieuws', nieuwsReducers),
    EffectsModule.forFeature([NieuwsberichtenEffects]),
    IonicModule,
    SharedModule
  ],
  providers: [
    NieuwsClient
  ]
})
export class NieuwsModule {}
