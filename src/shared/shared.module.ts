import {NgModule} from '@angular/core';
import {DatePipe} from './date/date';
import {SpinnerComponent} from './spinner/spinner.component';
import {IonicModule} from 'ionic-angular';
import {RichContentComponent} from './rich-content/rich-content/rich-content.component';
import {RichContentContainerComponent} from './rich-content/rich-content-container/rich-content-container.component';
import {RichContentParagraafComponent} from './rich-content/rich-content-paragraaf/rich-content-paragraaf.component';
import {RichContentService} from './rich-content/shared/rich-content.service';
import {PoorContentComponent} from './rich-content/poor-content/poor-content.component';

@NgModule({
  declarations: [
    DatePipe,
    PoorContentComponent,
    RichContentComponent,
    RichContentContainerComponent,
    RichContentParagraafComponent,
    SpinnerComponent],
	imports: [IonicModule],
  exports: [
    DatePipe,
    PoorContentComponent,
    RichContentComponent,
    SpinnerComponent],
  providers: [
    RichContentService
  ]
})
export class SharedModule {}
