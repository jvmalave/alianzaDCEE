import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { EditNewProductComponent } from './edit-new-product/edit-new-product.component';
import { ListProductsComponent } from './list-products/list-products.component';

const routes: Routes = [{
  path:'',
  component: ProductsComponent,
  children:[
    {
      path: 'registrar-producto',
      component: AddNewProductComponent, 
    },
    {
      path: 'editar-producto/:id',
      component: EditNewProductComponent, 
    },
    {
      path: 'lista-de-productos',
      component: ListProductsComponent, 
    }
  ]


}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
