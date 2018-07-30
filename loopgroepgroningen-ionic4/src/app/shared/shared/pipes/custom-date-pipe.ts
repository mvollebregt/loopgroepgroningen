import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'lgDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: string, format: string) {
    if (!date) {
      return date;
    } else {
      const dateWithoutTimeZone = date.substring(0, 16);
      const formattedDate = moment(dateWithoutTimeZone).format(format);
      return formattedDate.replace(/\./g, '');
    }
  }

}