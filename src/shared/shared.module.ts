import {NgModule} from '@angular/core';
import {DatePipe} from './date/date';
import {SpinnerComponent} from './spinner/spinner.component';
import {IonicModule} from 'ionic-angular';
import {ContentComponent} from './content/content.component';

@NgModule({
	declarations: [ContentComponent, DatePipe, SpinnerComponent],
	imports: [IonicModule],
	exports: [ContentComponent, DatePipe, SpinnerComponent]
})
export class SharedModule {}
