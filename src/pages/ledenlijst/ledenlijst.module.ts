import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LedenlijstPage} from './ledenlijst';
import {LedenlijstClient} from "./ledenlijst.client";
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    LedenlijstPage,
  ],
  imports: [
    IonicPageModule.forChild(LedenlijstPage),
    SharedModule
  ],
  providers: [
    LedenlijstClient
  ]
})
export class LedenlijstPageModule {}
