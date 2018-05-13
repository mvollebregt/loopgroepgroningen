import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: string) {
    // substring(0, 16) -> skip time zone
    return moment(date.substring(0, 16)).format("ddd D MMM YYYY - HH:mm").replace(/\./g, '')
  }
}
