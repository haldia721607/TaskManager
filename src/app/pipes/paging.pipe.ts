import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'paging'
})
export class PagingPipe implements PipeTransform {

  transform(value: Project[], currentPageIndex: number, pageSize: number): unknown {
    if (value == null) {
      return null;
    }
    let resultArrary = [];
    for (let i = currentPageIndex * pageSize; i < (currentPageIndex + 1) * pageSize; i++) {
      if (value[i]) {
        resultArrary.push(value[i]);
      }
    }
    return resultArrary;
  }

}
