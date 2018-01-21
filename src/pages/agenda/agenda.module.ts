import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AgendaPage} from './agenda';
import {AgendaClient} from './agenda.client';

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPage),
  ],
  providers: [
    AgendaClient
  ],
  entryComponents: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
