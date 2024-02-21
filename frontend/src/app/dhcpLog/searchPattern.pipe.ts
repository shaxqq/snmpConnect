import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPattern'
})
export class SearchPatternPipe implements PipeTransform {
  transform(log: string, searchPattern: string): string {
    if (!searchPattern || searchPattern === '') {
      return log;
    }
    const regExp = new RegExp(searchPattern, 'gi');
    return log.replace(regExp, match => `<b>${match}</b>`);
  }
}
