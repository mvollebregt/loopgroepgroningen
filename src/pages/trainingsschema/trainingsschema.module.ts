import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrainingsschemaPage} from './trainingsschema';
import {TrainingsschemaClient} from './trainingsschema.client';

@NgModule({
  declarations: [
    TrainingsschemaPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingsschemaPage),
  ],
  providers: [
    TrainingsschemaClient
  ]
})
export class TrainingsschemaPageModule {}
