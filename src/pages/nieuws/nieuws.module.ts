import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NieuwsPage} from './nieuws';

@NgModule({
  declarations: [
    NieuwsPage,
  ],
  imports: [
    IonicPageModule.forChild(NieuwsPage)
  ],
})
export class NieuwsPageModule {}
