import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoje',
})
export class HojePipe implements PipeTransform {
  
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
