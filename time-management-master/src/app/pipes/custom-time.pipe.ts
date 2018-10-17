import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../../utilities/Constants';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe extends DatePipe implements PipeTransform {
  transform(date: any, time: any): any {
    if (date && time !== null) {
      const hourFound = Constants.HOURS.filter(hour => {
        return hour.value === time;
      });
      if (hourFound && hourFound.length > 0) {
        return super.transform(date, 'MM/dd/yyyy') + ' ' + hourFound[0].name;
      }
    }
    return null;
  }
}
