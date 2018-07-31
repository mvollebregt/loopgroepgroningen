import {NgModule} from '@angular/core';
import {GesprekComponent} from './gesprek/gesprek.component';
import {PoorContentComponent} from './poor-content/poor-content.component';
import {SharedModule} from '../shared/shared.module';

const privateComponents = [PoorContentComponent];
const publicComponents = [GesprekComponent];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [...privateComponents, ...publicComponents],
  exports: publicComponents
})
export class BerichtenModule {
}
