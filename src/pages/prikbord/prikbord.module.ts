import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrikbordPage } from './prikbord';
import {PipesModule} from "../../pipes/pipes.module";
import {PrikbordClient} from "./shared/prikbord.client";
import {PrikbordService} from "./shared/prikbord.service";

@NgModule({
  declarations: [
    PrikbordPage,
  ],
  imports: [
    IonicPageModule.forChild(PrikbordPage),
    PipesModule
  ],
  entryComponents: [
    PrikbordPage
  ],
  providers: [
    PrikbordService,
    PrikbordClient
  ]
})
export class PrikbordPageModule {}
