import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LedenlijstPage } from './ledenlijst';

@NgModule({
  declarations: [
    LedenlijstPage,
  ],
  imports: [
    IonicPageModule.forChild(LedenlijstPage),
  ],
})
export class LedenlijstPageModule {}
