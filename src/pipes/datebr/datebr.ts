import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datebr',
})
export class DatebrPipe implements PipeTransform {

  transform(value: string, ...args) {
    let data = value.split("-")
    // console.log(data)
    return data[2]+"/"+data[1]+"/"+data[0];
  }
}
