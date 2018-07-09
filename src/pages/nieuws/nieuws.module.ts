import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NieuwsPage} from './nieuws';
import {NieuwslijstComponent} from './nieuwslijst/nieuwslijst.component';

@NgModule({
  declarations: [
    NieuwsPage,
    NieuwslijstComponent
  ],
  imports: [
    IonicPageModule.forChild(NieuwsPage)
  ],
})
export class NieuwsPageModule {}
