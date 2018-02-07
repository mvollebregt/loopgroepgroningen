import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EvenementPage} from './evenement';
import {EvenementdetailClient} from './evenementdetail.client';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EvenementPage,
  ],
  imports: [
    IonicPageModule.forChild(EvenementPage),
    PipesModule
  ],
  providers: [
    EvenementdetailClient
  ]
})
export class EvenementPageModule {}
