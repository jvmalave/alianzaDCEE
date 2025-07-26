import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteNewProductComponent } from '../delete-new-product/delete-new-product.component';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { CategoriesService } from '../../categories/_services/categories.service';
import { AuthService } from '../../auth/_services/auth.service';
import { UsersService } from '../../users/_services/users.service';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {



  products:any = [];
  products_seller:any = [];
  isLoading$:any;
  search: any = null;
  categorie: any = null;
  condition: any = null;
  product_seller_id: any = [];
  categories:any = [];
  currentRol: any = null;
  currentIdSeller: any = null;
  company_name: any = null;
  

  constructor(
    public _productService:ProductService,
    public router:Router,
    public modalService: NgbModal,
    public toaster: Toaster,
    public _categorieService:CategoriesService,
    private _authService: AuthService,
    public _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productService.isLoading$;
    this.allProducts();
    this.sellerProducts();
    this._categorieService.allCategories().subscribe((resp:any) =>{
      console.log(resp);
      this.categories = resp.categories;
      this.loadServices();
    this.currentRol = this._authService.user.rol;
    //console.log("ROL1", this.currentRol);
    this.currentIdSeller = this._authService.user._id;
    //console.log("ID", this.currentIdSeller);
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
      console.log("PRODUCT",resp);
      this.products = resp.products;
      this.product_seller_id = this.products.seller_id; 
    });
  }

  

  sellerProducts(){
    this._productService.sellerProducts(this.search, this.categorie, this.condition).subscribe((resp:any) => {
      console.log("SELLER-PRODUCT",resp);
      this.products_seller = resp.products_seller;
    })
  }

  refresh(){
    this.categorie = null;
    this.search = null;
    this.condition = null;
    if (this.currentRol === "admin"){
      this.allProducts();
    }else {
      this.sellerProducts();
    }
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
