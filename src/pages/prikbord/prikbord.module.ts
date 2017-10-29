import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PrikbordPage} from './prikbord';
import {PipesModule} from "../../pipes/pipes.module";

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
  ]
})
export class PrikbordPageModule {}
