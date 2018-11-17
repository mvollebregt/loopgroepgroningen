import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
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
import {nieuwsReducer} from './store/nieuws.reducer';
import {NieuwsEffects} from './store/nieuws.effects';
import {NieuwsState} from './store/nieuws.state';
import {HerstelNieuwsOpgeslagenState} from './store/nieuws.action';

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
    StoreModule.forFeature('nieuws', nieuwsReducer),
    EffectsModule.forFeature([NieuwsEffects]),
    IonicModule,
    RichContentModule,
    SharedModule
  ]
})
export class NieuwsModule {

  constructor(store: Store<NieuwsState>) {
    store.dispatch(new HerstelNieuwsOpgeslagenState());
  }

}
