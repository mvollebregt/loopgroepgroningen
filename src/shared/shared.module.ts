import {NgModule} from '@angular/core';
import {DatePipe} from './date/date';
import {SpinnerComponent} from './spinner/spinner.component';
import {IonicModule} from 'ionic-angular';
import {RichContentComponent} from './rich-content/rich-content.component';

@NgModule({
  declarations: [RichContentComponent, DatePipe, SpinnerComponent],
	imports: [IonicModule],
  exports: [RichContentComponent, DatePipe, SpinnerComponent]
})
export class SharedModule {}
