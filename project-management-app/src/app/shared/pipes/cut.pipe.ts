import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut',
})
export class CutPipe implements PipeTransform {
  transform(str: string, length: number): string {
    if (str.length <= length) {
      return str;
    }
    return str.slice(0, length) + '...';
  }
}
