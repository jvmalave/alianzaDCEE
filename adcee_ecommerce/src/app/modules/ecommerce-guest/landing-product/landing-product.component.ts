import { Component, OnInit } from '@angular/core';
import { EcommerceGuestService } from '../_services/ecommerce-guest.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { UserService } from '../../user/user.service';

declare var $:any;
declare function LandingProductDetail(): any;
declare function ModalProductDetail(): any;
declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;


@Component({
  selector: 'app-landing-product',
  templateUrl: './landing-product.component.html',
  styleUrls: ['./landing-product.component.css']
})
export class LandingProductComponent implements OnInit{

  
  company_name: string = '';

  slug: any = null;
  product_selected:any = null;
  product_selected_modal: any = null;
  related_products:any = [];
  variedad_selected:any = null;
  variedad_selected_modal:any = null;

  discount_id:any;
  SALE_FLASH:any = null;

  REVIEWS: any;
  AVG_REVIEW: any;
  COUNT_REVIEW: any;


  constructor(
    public ecommerce_guest: EcommerceGuestService,
    public router: Router,
    public routerActived: ActivatedRoute,
    public cartService: CartService,
    public userService: UserService

  ){}

  ngOnInit(): void {
    this.routerActived.params.subscribe((resp:any) => {
      this.slug = resp["slug"];
    })
    this.routerActived.queryParams.subscribe((resp:any) => {
      this.discount_id = resp["_id"];
    })
    //console.log(this.slug);
    this.ecommerce_guest.showLandingProduct(this.slug, this.discount_id).subscribe((resp:any) => {
      //console.log(resp);
      this.product_selected = resp.product;
      this.related_products = resp.related_products;
      this.SALE_FLASH = resp.SALE_FLASH;
      this.REVIEWS = resp.REVIEWS;
      this.AVG_REVIEW = resp.AVG_REVIEW;
      this.COUNT_REVIEW = resp.COUNT_REVIEW;

      if (this.product_selected && this.product_selected.seller_id) {
      this.userService.getUserById(this.product_selected.seller_id).subscribe((resp: any) => {
      if (resp.user && resp.user.company) {
      this.company_name = resp.user.company;

      //console.log("COMPANY", this.company_name )
    }
  });
}

      setTimeout(() => {
        LandingProductDetail();
      }, 50);
    })
  }
  
  OpenModal(bestProduct:any, FlashSale:any = null){
    this.product_selected_modal = null;
    this.SALE_FLASH = FlashSale; 
  
    setTimeout(() => {

    this.product_selected_modal = bestProduct;
    this.product_selected_modal.FlashSale = FlashSale;

    setTimeout(() => {
    ModalProductDetail();
    }, 50);
    }, 100);
  }

  getDiscount(){
    let discount =  0;
    if(this.SALE_FLASH){
      if(this.SALE_FLASH.type_discount == 1){
        return this.SALE_FLASH.discount*this.product_selected.price_usd*0.01;
      }else{
        return this.SALE_FLASH.discount;
      }
    }
    return discount; 
  }

  getDiscountModal(){
    let discount =  0;
    //console.log(this.SALE_FLASH);
    if(this.SALE_FLASH){
      if(this.SALE_FLASH.type_discount == 1){
        return this.SALE_FLASH.discount*this.product_selected_modal.price_usd*0.01;
      }else{
        return this.SALE_FLASH.discount;
      }
    }
    return discount;
  }


  getCalNewPrice(product:any){
    //  if(this.FlashSale.type_discount == 1){
    //    return product.price_usd - product.price_usd*this.FlashSale.discount*0.01;
    //  }else{
    //    return product.price_usd - this.FlashSale.discount
    //  }
    // return 0;
  }

  selectedVariedad(variedad:any){
    this.variedad_selected = variedad;
  }

  selectedVariedadModal(variedad:any){
    this.variedad_selected_modal = variedad;
  }


  addCart(product:any){
    //console.log(product);
    if (!this.cartService._authService.user){
      alertDanger('Upss! Necesitas autenticarte para poder agregar productos al carrito de compras');
      return;
    }
    if($("#qty-cart").val() == 0){
      alertDanger("Upss! Necesitas agregar al carrito de compras una cantidad del producto mayor a O unidades");
      return;
    }
    if(this.product_selected.type_inventario == 2){
      if(!this.variedad_selected){
        alertDanger("Upss! Necesitas seleccionar una variedad del productos al carrito de compras");
      return;
      }
    }
    if(this.product_selected.type_inventario == 2){
      if(this.variedad_selected){
        if(this.variedad_selected.stock < $("#qty-cart").val()){
          alertDanger("Upss! No hay disponibilidad suficiente para la cantidad solicitada de la variedad, Escoja una cantidad igual o menor de "+this.variedad_selected.stock);
          return
        }
      }
    }
    let data = {
      user: this.cartService._authService.user._id,
      product: this.product_selected._id,
      type_discount: this.SALE_FLASH ? this.SALE_FLASH.type_discount : null,
      discount: this.SALE_FLASH ? this.SALE_FLASH.discount : 0, 
      cantidad: $("#qty-cart").val(),
      variedad: this.variedad_selected ? this.variedad_selected._id : null,
      code_cupon: null,
      code_discount: this.SALE_FLASH ? this.SALE_FLASH._id : null,
      price_unit: this.product_selected.price_usd,
      subtotal: this.product_selected.price_usd - this.getDiscount(),  // * $("#qty-cart").val(),
      total: (this.product_selected.price_usd - this.getDiscount()) * $("#qty-cart").val(),

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

  addCartModal(product:any){
    console.log(product);
    if (!this.cartService._authService.user){
      alertDanger('Upss! Necesitas autenticarte para poder agregar productos al carrito de compras');
      return;
    }
    if($("#qty-cart").val() == 0){
      alertDanger("Upss! Necesitas agregar al carrito de compras una cantidad del producto mayor a O unidades");
      return;
    }
    if(this.product_selected_modal.type_inventario == 2){
      if(!this.variedad_selected_modal){
        alertDanger("Upss! Necesitas seleccionar una variedad del productos al carrito de compras");
      return;
      }
    }
    if(this.product_selected_modal.type_inventario == 2){
      if(this.variedad_selected_modal){
        if(this.variedad_selected_modal.stock < $("#qty-cart").val()){
          alertDanger("Upss! No hay disponibilidad suficiente para la cantidad solicitada de la variedad, Escoja una cantidad igual o menor de "+this.variedad_selected_modal.stock);
          return
        }
      }
    }
    let data = {
      user: this.cartService._authService.user._id,
      product: this.product_selected_modal._id,
      type_discount: this.SALE_FLASH ? this.SALE_FLASH.type_discount : null,
      discount: this.SALE_FLASH ? this.SALE_FLASH.discount : 0, 
      cantidad: $("#qty-cart").val(),
      variedad: this.variedad_selected_modal ? this.variedad_selected_modal._id : null,
      code_cupon: null,
      code_discount: this.SALE_FLASH ? this.SALE_FLASH._id : null,
      price_unit: this.product_selected_modal.price_usd,
      subtotal: this.product_selected_modal.price_usd - this.getDiscountModal(),  // * $("#qty-cart").val(),
      total: (this.product_selected_modal.price_usd - this.getDiscountModal()) * $("#qty-cart").val(),

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


  


}
