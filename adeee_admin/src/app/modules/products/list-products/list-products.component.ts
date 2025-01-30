import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteNewProductComponent } from '../delete-new-product/delete-new-product.component';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriesService } from '../../categories/_services/categories.service';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {



  products:any = [];
  isLoading$:any;
  search: any = null;
  categorie: any = null;
  condition: any = null;

  categories:any = [];
  

  constructor(
    public _productService:ProductService,
    public router:Router,
    public modalService: NgbModal,
    public toaster: Toaster,
    public _categorieService:CategoriesService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
    this.allProducts();
    this._categorieService.allCategories().subscribe((resp:any) =>{
      console.log(resp);
      this.categories = resp.categories;
      this.loadServices();
    })
  }

  loadServices(){
    this._productService.isLoadingSubject.next(true);
    setTimeout(() => {
      this._productService.isLoadingSubject.next(false);
    },50);
  }

  allProducts(){
    this._productService.allProducts(this.search, this.categorie, this.condition).subscribe((resp:any) => {
      console.log(resp);
      this.products = resp.products;
    })
  }

  refresh(){
    this.categorie = null;
    this.search = null;
    this.condition = null;
    this.allProducts();
    
  }

  editProduct(product){
    this.router.navigateByUrl("/productos/editar-producto/"+product._id);

  }
  delete(product){
    const modalRef = this.modalService.open(DeleteNewProductComponent,{centered:true, size:'md'});

    modalRef.componentInstance.product = product;

    modalRef.componentInstance.productD.subscribe((resp:any) => {
      let index = this.products.findIndex(item => item._id == product._id);
      if(index != -1){
        this.products.splice(index,1);
        this.toaster.open(NoticyAlertComponent,{text:`success-'Super! El producto se eliminó satisfactoriamente'`});
      }
    })
  }

}
