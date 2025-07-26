import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/_services/auth.guard';
import {UserRole} from './modules/auth/_services/auth.service';

export const routes: Routes = [
  
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: 'emprendedor',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/emprendedor/emprendedor.module').then((m) => m.EmprendedorModule),
    data: { role: UserRole.EMPRENDEDOR } // Define el rol para emprendedores
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule),
  },

  {
    path: 'pending-payments',
    loadChildren: () => import('./modules/pending-payments/pending-payments.module').then(m => m.PendingPaymentsModule)
  },
  
  { path: '**', redirectTo: 'error/404' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
