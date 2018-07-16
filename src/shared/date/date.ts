import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date?: string, format = "ddd D MMM YYYY - HH:mm") {
    // substring(0, 16) -> skip time zone
    return date && moment(date.substring(0, 16)).format(format).replace(/\./g, '');
  }
}
