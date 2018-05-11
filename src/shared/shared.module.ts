import {NgModule} from '@angular/core';
import {DatePipe} from './date/date';
import {SpinnerComponent} from './spinner/spinner.component';
import {IonicModule} from 'ionic-angular';

@NgModule({
	declarations: [DatePipe, SpinnerComponent],
	imports: [IonicModule],
	exports: [DatePipe, SpinnerComponent]
})
export class SharedModule {}
