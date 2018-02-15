import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrainingsschemaPage} from './trainingsschema';
import {TrainingsschemaClient} from './trainingsschema.client';
import {TrainingsschemaService} from './trainingsschema.service';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    TrainingsschemaPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingsschemaPage),
    SharedModule
  ],
  providers: [
    TrainingsschemaClient,
    TrainingsschemaService
  ]
})
export class TrainingsschemaPageModule {}
