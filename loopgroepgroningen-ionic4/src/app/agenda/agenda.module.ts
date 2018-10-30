import {NgModule} from '@angular/core';
import {EvenementPage} from './evenement-page/evenement-page.component';
import {AgendaPageComponent} from './agenda-page/agenda-page.component';
import {ListModule} from '../shared/list/list.module';
import {SharedModule} from '../shared/shared/shared.module';
import {AgendaRoutingModule} from './agenda-routing.module';
import {RichContentModule} from '../shared/rich-content/rich-content.module';
import {BerichtenModule} from '../shared/berichten/berichten.module';

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
    SharedModule
  ]
})
export class AgendaModule {
}
