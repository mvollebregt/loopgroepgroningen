import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'Moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: string) {
    return moment(date).format("ddd D MMM YYYY - HH:mm").replace(/\./g, '')
  }
}
