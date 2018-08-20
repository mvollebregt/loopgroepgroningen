import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {CustomDatePipe} from './pipes/custom-date-pipe';

const modules = [
  CommonModule,
  IonicModule
];

const directives = [
  CustomDatePipe
];


@NgModule({
  declarations: directives,
  imports: modules,
  exports: [...modules, ...directives]
})
export class SharedModule {
}
