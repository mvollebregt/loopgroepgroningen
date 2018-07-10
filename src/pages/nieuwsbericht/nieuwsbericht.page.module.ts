import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NieuwsberichtPage} from './nieuwsbericht.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    NieuwsberichtPage,
  ],
  imports: [
    IonicPageModule.forChild(NieuwsberichtPage),
    SharedModule
  ],
})
export class NieuwsberichtPageModule {}
