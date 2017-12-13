import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LedenlijstPage } from './ledenlijst';
import {LedenlijstClient} from "./ledenlijst.client";

@NgModule({
  declarations: [
    LedenlijstPage,
  ],
  imports: [
    IonicPageModule.forChild(LedenlijstPage),
  ],
  providers: [
    LedenlijstClient
  ]
})
export class LedenlijstPageModule {}
