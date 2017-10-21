import { Pipe, PipeTransform } from '@angular/core';
import {Moment} from "moment";

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: Moment) {
    return date.format("ddd D MMM YYYY - HH:mm").replace(/\./g, '')
  }
}
