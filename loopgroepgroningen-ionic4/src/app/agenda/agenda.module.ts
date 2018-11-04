import {NgModule} from '@angular/core';
import {EvenementPage} from './evenement-page/evenement-page.component';
import {AgendaPageComponent} from './agenda-page/agenda-page.component';
import {ListModule} from '../shared/list/list.module';
import {SharedModule} from '../shared/shared/shared.module';
import {AgendaRoutingModule} from './agenda-routing.module';
import {RichContentModule} from '../shared/rich-content/rich-content.module';
import {BerichtenModule} from '../shared/berichten/berichten.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {agendaReducer} from './store/agenda.reducer';
import {AgendaEffects} from './store/agenda.effect';

@NgModule({
  declarations: [
    AgendaPageComponent,
    EvenementPage
  ],
  imports: [
    AgendaRoutingModule,
    BerichtenModule,
    ListModule,
    RichContentModule,
    StoreModule.forFeature('agenda', agendaReducer),
    EffectsModule.forFeature([AgendaEffects]),
    SharedModule,
  ]
})
export class AgendaModule {
}
