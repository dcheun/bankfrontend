import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cents2dollars',
})
export class Cents2dollarsPipe implements PipeTransform {
  transform(amount: number): number {
    return amount * 0.01;
  }
}
