import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  // pure: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const hours = Math.floor((value / 60) /60);
    const minutes = Math.floor(value / 60) % 60;
    const seconds = value % 60;
    return `${this.isTenDigit(hours)}${hours}:
            ${this.isTenDigit(minutes)}${minutes}:
            ${this.isTenDigit(seconds)}${seconds}`;
  }

  isTenDigit(time) {
    return (time >= 10) ? '' : '0'; 
  }

}
