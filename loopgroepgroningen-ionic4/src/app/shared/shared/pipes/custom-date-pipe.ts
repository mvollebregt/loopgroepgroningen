import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'lgDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: string, format: string) {
    // substring(0, 16) -> skip time zone
    return date && moment(date.substring(0, 16)).format(format).replace(/\./g, '');
  }
}
