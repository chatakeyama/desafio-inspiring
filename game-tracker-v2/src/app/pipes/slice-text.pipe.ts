import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class SlicePipe implements PipeTransform {

  transform = (text: string, indexEnd: number): string => {
    return text.length > indexEnd ? `${text.slice(0, indexEnd)}...` : text
  }

}
