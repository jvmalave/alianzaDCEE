import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'venezuelanCurrency'
})
export class VenezuelanCurrencyPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    // Configura Intl.NumberFormat para es-VE
    const formatter = new Intl.NumberFormat('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  }
}