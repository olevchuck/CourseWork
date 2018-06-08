import {Pipe, PipeTransform} from '@angular/core';
import * as dateFormat from 'dateformat';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform{
  transform(seconds){
    let time = new Date(seconds * 1000);
    return dateFormat(time,"MM:ss")
  }
}
