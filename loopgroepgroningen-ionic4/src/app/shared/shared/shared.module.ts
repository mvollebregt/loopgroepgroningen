import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

const modules = [
  CommonModule,
  IonicModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule {
}
