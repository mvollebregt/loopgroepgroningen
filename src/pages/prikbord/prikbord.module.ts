import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrikbordPage } from './prikbord';

@NgModule({
  declarations: [
    PrikbordPage,
  ],
  imports: [
    IonicPageModule.forChild(PrikbordPage),
  ],
  entryComponents: [
    PrikbordPage
  ]
})
export class PrikbordPageModule {}
