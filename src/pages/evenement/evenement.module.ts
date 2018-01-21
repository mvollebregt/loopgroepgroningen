import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EvenementPage} from './evenement';
import {EvenementdetailClient} from './evenementdetail.client';

@NgModule({
  declarations: [
    EvenementPage,
  ],
  imports: [
    IonicPageModule.forChild(EvenementPage),
  ],
  providers: [
    EvenementdetailClient
  ]
})
export class EvenementPageModule {}
