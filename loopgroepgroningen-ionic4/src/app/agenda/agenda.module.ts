import {NgModule} from '@angular/core';
import {EvenementPage} from './evenement-page/evenement-page.component';
import {AgendaPageComponent} from './agenda-page/agenda-page.component';
import {ListModule} from '../shared/list/list.module';
import {SharedModule} from '../shared/shared/shared.module';
import {AgendaRoutingModule} from './agenda-routing.module';

@NgModule({
  declarations: [
    AgendaPageComponent,
    EvenementPage
  ],
  imports: [
    AgendaRoutingModule,
    ListModule,
    SharedModule
  ]
})
export class AgendaModule {
}
