import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingPaymentsRoutingModule } from './pending-payments-routing.module';
import { PendingPaymentsComponent } from './pending-payments.component';
import { ListPaymentsComponent } from './list-payments/list-payments.component';


@NgModule({
  declarations: [PendingPaymentsComponent, ListPaymentsComponent],
  imports: [
    CommonModule,
    PendingPaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PendingPaymentsModule { }
