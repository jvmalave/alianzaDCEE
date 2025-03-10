import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceAuthModule } from './modules/ecommerce-auth/ecommerce-auth.module';
import { AuthGuard } from './modules/auth-profile/_service/auth.guard';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import("./modules/ecommerce-guest/ecommerce-guest.module").then(m => m.EcommerceGuestModule),
  },
  {
    path: '',
    canActivate:[AuthGuard],
    loadChildren: () => import("./modules/ecommerce-auth/ecommerce-auth.module").then(m => m.EcommerceAuthModule),
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth-profile/auth-profile.module").then(m => m.AuthProfileModule),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path:'**',
    redirectTo:'error/404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
