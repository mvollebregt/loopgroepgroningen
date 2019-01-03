import {NgModule} from '@angular/core';
import {GesprekComponent} from './gesprek/gesprek.component';
import {SharedModule} from '../shared/shared.module';
import {RichContentModule} from '../rich-content/rich-content.module';
import {ReactieComponent} from './reactie/reactie.component';

const directives = [GesprekComponent, ReactieComponent];

@NgModule({
  imports: [
    RichContentModule,
    SharedModule
  ],
  declarations: directives,
  exports: directives
})
export class BerichtenModule {
}
