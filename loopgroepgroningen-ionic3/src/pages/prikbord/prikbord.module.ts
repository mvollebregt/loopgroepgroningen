import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PrikbordPage} from './prikbord';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    PrikbordPage,
  ],
  imports: [
    IonicPageModule.forChild(PrikbordPage),
    SharedModule
  ],
  entryComponents: [
    PrikbordPage
  ]
})
export class PrikbordPageModule {}
