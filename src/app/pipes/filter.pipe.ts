import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchBy: string, searchText: string): any {
    if (value == null) {
      return value;
    }
    let resaultArrary = [];
    if (searchText != null) {
      for (let item of value) {
        if (String(item[searchBy]).toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
          resaultArrary.push(item);
        }
      }
    }
    if (resaultArrary.length > 0) {
      return resaultArrary;
    }
    return value;
  }

}
