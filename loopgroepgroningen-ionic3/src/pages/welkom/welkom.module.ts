import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {WelkomPage} from './welkom';

@NgModule({
  declarations: [
    WelkomPage,
  ],
  imports: [
    IonicPageModule.forChild(WelkomPage),
  ],
})
export class WelkomPageModule {}
