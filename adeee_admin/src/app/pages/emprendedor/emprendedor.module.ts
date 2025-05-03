import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { CouponsComponent } from './coupons/coupons.component';

const routes: Routes = [
  { path: 'mis-productos', component: MisProductosComponent },
  { path: 'cupones', component: CouponsComponent }
];

@NgModule({
  declarations: [MisProductosComponent, CouponsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmprendedorModule {}
