import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {nieuwsReducers} from './store/nieuws.reducers';
import {NieuwsberichtenEffects} from './store/nieuwsberichten.effect';
import {NieuwsberichtenLijstComponent} from './nieuwsberichten-lijst/nieuwsberichten-lijst.component';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {NieuwsberichtDetailComponent} from './nieuwsbericht-detail/nieuwsbericht-detail.component';
import {NieuwsoverzichtPageComponent} from './nieuwsoverzicht-page/nieuwsoverzicht-page.component';
import {SharedModule} from '../shared/shared/shared.module';
import {RichContentModule} from '../shared/rich-content/rich-content.module';
import {NieuwsRoutingModule} from './nieuws-routing.module';

@NgModule({
  declarations: [
    NieuwsberichtDetailComponent,
    NieuwsberichtenLijstComponent,
    NieuwsoverzichtPageComponent
  ],
  imports: [
    NieuwsRoutingModule,
    StoreModule.forFeature('nieuws', nieuwsReducers),
    EffectsModule.forFeature([NieuwsberichtenEffects]),
    IonicModule,
    RichContentModule,
    SharedModule
  ]
})
export class NieuwsModule {}
