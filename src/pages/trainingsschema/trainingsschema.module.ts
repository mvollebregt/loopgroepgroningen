import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrainingsschemaPage} from './trainingsschema';
import {TrainingsschemaClient} from './trainingsschema.client';
import {TrainingsschemaService} from './trainingsschema.service';

@NgModule({
  declarations: [
    TrainingsschemaPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingsschemaPage),
  ],
  providers: [
    TrainingsschemaClient,
    TrainingsschemaService
  ]
})
export class TrainingsschemaPageModule {}
