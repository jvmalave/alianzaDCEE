import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VenezuelanCurrencyPipe } from '../pipe/venezuelan-currency.pipe'


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    VenezuelanCurrencyPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    VenezuelanCurrencyPipe
  ]
})
export class SharedModule { }
