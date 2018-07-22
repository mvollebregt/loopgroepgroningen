import {NgModule} from '@angular/core';
import {DatePipe} from './date/date';
import {SpinnerComponent} from './spinner/spinner.component';
import {IonicModule} from 'ionic-angular';
import {RichContentComponent} from './rich-content/rich-content/rich-content.component';
import {RichContentParagraafComponent} from './rich-content/rich-content-paragraaf/rich-content-paragraaf.component';
import {RichContentService} from './rich-content/shared/rich-content.service';
import {PoorContentComponent} from './rich-content/poor-content/poor-content.component';
import {RichContentAfbeeldingComponent} from './rich-content/rich-content-afbeelding/rich-content-afbeelding.component';

@NgModule({
  declarations: [
    DatePipe,
    PoorContentComponent,
    RichContentComponent,
    RichContentAfbeeldingComponent,
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
