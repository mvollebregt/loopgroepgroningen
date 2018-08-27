import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NieuwsoverzichtPage} from './nieuwsoverzicht.page';
import {NieuwsModule} from '../../features/nieuws/nieuws.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    NieuwsoverzichtPage,
  ],
  imports: [
    IonicPageModule.forChild(NieuwsoverzichtPage),
    NieuwsModule,
    SharedModule
  ]
})
export class NieuwsoverzichtPageModule {}
