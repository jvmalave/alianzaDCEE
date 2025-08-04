import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafehtmlPipe } from './safehtml.pipe';
import { SafeurlPipe } from './safeurl.pipe';
import { VenezuelanCurrencyPipe } from './venezuelan-currency.pipe';
// import { TranslateyPipe } from './translatey.pipe';



@NgModule({
  declarations: [SafehtmlPipe, SafeurlPipe, VenezuelanCurrencyPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SafehtmlPipe,
    SafeurlPipe,
    VenezuelanCurrencyPipe
  ]
})
export class PipesModule { }
