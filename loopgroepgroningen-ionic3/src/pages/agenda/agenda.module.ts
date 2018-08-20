import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AgendaPage} from './agenda';
import {AgendaClient} from './agenda.client';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPage),
    SharedModule
  ],
  providers: [
    AgendaClient
  ],
  entryComponents: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
