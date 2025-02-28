import { Component, OnInit } from '@angular/core';
import { EcommerceGuestService } from '../_services/ecommerce-guest.service';
import { CartService } from '../_services/cart.service';
import { Router } from '@angular/router';


declare function priceRangeSlider(): any;
declare var $:any;
declare function ModalProductDetail():any;
declare function alertDanger([]):any;
declare function alertSuccess([]):any; 

@Component({
  selector: 'app-filters-products',
  templateUrl: './filters-products.component.html',
  styleUrls: ['./filters-products.component.css']
})
export class FiltersProductsComponent implements OnInit{

  categories:any = [];
  variedades: any = [];

  categories_salecteds: any = [];

  is_discount:any = 1; // 1: Todos los productos | 2: Productos con descuentos

  variedad_selected:any = {
    _id: null,
  };

  products:any = [];
  product_selected: any = null;

  constructor(
    public ecommerceGuest: EcommerceGuestService,
    public cartService: CartService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.ecommerceGuest.configInitial().subscribe((resp:any) => {
      console.log(resp);
      this.categories = resp.categories;
      this.variedades = resp.variedades;

    })
    setTimeout(() => {
      priceRangeSlider()
    }, 50);

    this.filterProduct();
  }

  addCategorie(categorie:any){
    let index = this.categories_salecteds.findIndex((item:any) => item == categorie._id);
    if(index != -1){
      this.categories_salecteds.splice(index,1);
    }else{
      this.categories_salecteds.push(categorie._id);
    }
    this.filterProduct();
  }

  selectedDiscount(value:number){
    this.is_discount = value;
    this.filterProduct();
  }

  selectedVariedad(variedad:any){
    this.variedad_selected = variedad;
    this.filterProduct();
  }

  filterProduct(){
    let data = {
    categories_salecteds: this.categories_salecteds,
    is_discount: this.is_discount,
    variedad_selected: this.variedad_selected._id ? this.variedad_selected : null,
    price_min: $("#amount-min").val(),
    price_max: $("#amount-max").val(),

    }
    this.ecommerceGuest.filterProduct(data).subscribe((resp:any) => {
      console.log(resp);
      this.products = resp.products;
    })
  }

  getDiscountProduct(product:any){
      if(product.campaign_discount){
        if(product.campaign_discount.type_discount == 1){// por porcentaje
          return product.price_usd*product.campaign_discount.discount*0.01;
        }else{// por moneda
          return product.campaign_discount.discount;
        }
      }
    return 0;
  }

  getRouterDiscount(product:any){
    if(product.campaign_discount){
      return {_id: product.campaign_discount._id};
    }
    return{}
  }

  addCart(product:any){
   
    if (!this.cartService._authService.user){
      alertDanger('Upss! Necesitas autenticarte para poder agregar productos al carrito de compras');
      return;
    }
    if($("#qty-cart").val() == 0){
      alertDanger("Upss! Necesitas agregar al carrito de compras una cantidad del producto mayor a O unidades");
      return;
    }
    if(product.type_inventario == 2){
    
      this.router.navigateByUrl("/landing-producto"+product.slug)
    }
    let type_discount:any =null;
    let discount:any = 0;
    let code_discount:any = null;

    if(product.campaign_discount){
      type_discount = product.campaign_discount.type_discount;
      discount = product.campaign_discount.discount;
      code_discount = product.campaign_discount._id;
    }
    
    let data = {
      user: this.cartService._authService.user._id,
      product: product._id,
      type_discount: type_discount,
      discount: discount,
      cantidad: 1,
      variedad: null,
      code_cupon: null,
      code_discount: code_discount,
      price_unit: product.price_usd,
      subtotal: product.price_usd - this.getDiscountProduct(product),  // 1
      total: (product.price_usd - this.getDiscountProduct(product)) *1,

    }
    this.cartService.registerCart(data).subscribe((resp:any) => {
      if(resp.message == 403){
        alertDanger(resp.message_text);
        return;
      }else {
        this.cartService.changeCart(resp.cart);
        alertSuccess("Super! El producto se ha agregado satisfactoriamente")
      }
    },error => {
      console.log(error);
      if(error.error.message == "Upss! El token no es valido"){
        this.cartService._authService.logout();
      }
    })
  }

  OpenModal(product:any){
    this.product_selected = null;
  

    setTimeout(() => {
    this.product_selected = product;
    setTimeout(() => {
    ModalProductDetail();
    }, 50);
    }, 100);
  }

  getCalNewPrice(product:any){
    if(product.campaign_discount){
      if(product.campaign_discount.type_discount == 1){
        return product.price_usd - product.price_usd*product.campaign_discount.discount*0.01;
      }else{
        return product.price_usd - product.campaign_discount.discount
      }
    }
    return 0;
  }
  
}
