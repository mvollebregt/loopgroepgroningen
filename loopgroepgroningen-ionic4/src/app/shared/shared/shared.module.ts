import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {CustomDatePipe} from './pipes/custom-date-pipe';
import {PullToRefreshDirective} from './directives/pull-to-refresh-directive';
import {ConnectFormDirective} from './directives/connect-form.directive';

const modules = [
  CommonModule,
  IonicModule
];

const directives = [
  CustomDatePipe,
  ConnectFormDirective,
  PullToRefreshDirective
];


@NgModule({
  declarations: directives,
  imports: modules,
  exports: [...modules, ...directives]
})
export class SharedModule {
}
