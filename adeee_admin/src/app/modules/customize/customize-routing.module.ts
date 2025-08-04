import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomizeComponent } from './customize.component';
import { ListCustomizeComponent } from './list-customize/list-customize.component';

const routes: Routes = [
  {
    path: 'c',
    component: CustomizeComponent,
    children: [
       
      { 
        path: 'lista-configuracion', 
        component: ListCustomizeComponent, 
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class CustomizeRoutingModule { }

