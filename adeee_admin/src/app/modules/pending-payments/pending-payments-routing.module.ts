import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingPaymentsComponent } from './pending-payments.component';
import { ListPaymentsComponent } from './list-payments/list-payments.component';


const routes: Routes = [
  {
    path: '',
    component: PendingPaymentsComponent,
    children: [
      { 
        path: 'lista-de-pagos', 
        component: ListPaymentsComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingPaymentsRoutingModule { }
