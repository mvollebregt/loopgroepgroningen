import {NgModule} from '@angular/core';
import {GesprekComponent} from './gesprek/gesprek.component';
import {SharedModule} from '../shared/shared.module';
import {RichContentModule} from '../rich-content/rich-content.module';

const directives = [GesprekComponent];

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
