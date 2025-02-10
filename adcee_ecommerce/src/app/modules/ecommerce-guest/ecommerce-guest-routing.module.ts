import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingProductComponent } from './landing-product/landing-product.component';
import { EcommerceGuestComponent } from './ecommerce-guest.component';

const routes: Routes = [
  {
    path:'',
    component: EcommerceGuestComponent,
    children: [
      {
        path:'landing-producto/:slug',
        component:LandingProductComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceGuestRoutingModule { }
