import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NieuwsberichtPage} from './nieuwsbericht.page';
import {NieuwsModule} from '../../features/nieuws/nieuws.module';

@NgModule({
  declarations: [
    NieuwsberichtPage
  ],
  imports: [
    IonicPageModule.forChild(NieuwsberichtPage),
    NieuwsModule
  ],
})
export class NieuwsberichtPageModule {}
