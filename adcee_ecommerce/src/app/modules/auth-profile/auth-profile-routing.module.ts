import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthProfileComponent } from './auth-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_service/auth.guard';
import { RegisterSellerComponent } from './register-seller/register-seller.component';

const routes: Routes = [
  {
    path: '',
    component:AuthProfileComponent,
    children:[
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'registro-cliente',
        //canActivate:[AuthGuard],
        component: RegisterComponent
      },

      {
        path:'registro-seller',
        canActivate:[AuthGuard],
        component: RegisterSellerComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthProfileRoutingModule { }
