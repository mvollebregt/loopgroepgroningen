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
import {ListModule} from '../shared/list/list.module';
import {NieuwsberichtPageComponent} from './nieuwsbericht-page/nieuwsbericht-page.component';

@NgModule({
  declarations: [
    NieuwsberichtDetailComponent,
    NieuwsberichtenLijstComponent,
    NieuwsberichtPageComponent,
    NieuwsoverzichtPageComponent
  ],
  imports: [
    ListModule,
    NieuwsRoutingModule,
    StoreModule.forFeature('nieuws', nieuwsReducers),
    EffectsModule.forFeature([NieuwsberichtenEffects]),
    IonicModule,
    RichContentModule,
    SharedModule
  ]
})
export class NieuwsModule {}
