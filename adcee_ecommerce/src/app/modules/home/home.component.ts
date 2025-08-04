import { Component, OnInit } from '@angular/core';
import { HomeService } from './_services/home.service';
import { CartService } from '../ecommerce-guest/_services/cart.service';
import { Router } from '@angular/router';
import {URL_FROTEND_ADM } from '../../config/config'



declare var $:any;
declare function HOMEINITTEMPLATE([]):any;
declare function ModalProductDetail():any;
declare function alertDanger([]):any;
declare function alertSuccess([]):any; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliders:any = [];
  categories:any = [];
  productPromo: any = [];
  bestProducts:any = [];
  our_products: any = [];
  donation_products:any = [];
  product_selected: any = null;
  FlashSale:any = null;
  FlashPrductList:any =[];
  newPrice_usd_porc_flash: any = 0;
  newPrice_usd_porc_campaign: any = 0;
  newPrice_usd_mon_flash: any = 0;
  newPrice_usd_mon_campaign: any = 0;
  newPrice_bs_porc_flash: any = 0;
  newPrice_bs_porc_campaign: any = 0;
  newPrice_bs_mon_flash: any = 0;
  newPrice_bs_mon_campaign: any = 0;
  tasaCambio_bcv: any = 0;
  price_bs: any = 0;
  campaign_discount: any = null;
  
  


  
  constructor(
    public homeService: HomeService,
    public cartService: CartService,
    public router: Router,
    
  ) {}

  title = 'adcee_ecommerce';
  ngOnInit():void {
    let TIME_NOW = new Date().getTime()
    this.homeService.listHome(TIME_NOW).subscribe((resp:any) =>{
      console.log("ECOMMERCE",resp);
      this.sliders = resp.sliders;
      this.categories = resp.categories;
      this.productPromo = resp.productPromo;
      this.bestProducts = resp.best_products;
      this.our_products = resp.our_products;
      this.donation_products = resp.donation_products;
      this.FlashSale = resp.FlashSale;
      this.FlashPrductList = resp.campaign_products;
      this.campaign_discount = resp.campaign_discount;
    
      setTimeout(() => {
        if(this.FlashSale){
          var eventCounter = $(".sale-countdown");
          let PARSE_DATE = new Date(this.FlashSale.end_date);
          // console.log(PARSE_DATE.getMonth(), PARSE_DATE.getDate());
          let DATE = PARSE_DATE.getFullYear() + "/" + (PARSE_DATE.getMonth()+1) + "/" + (PARSE_DATE.getDate()+1);
          if (eventCounter.length) {
            eventCounter.countdown(DATE, function(e:any) {
              eventCounter.html(
                    e.strftime(
                        "<div class='countdown-section'><div><div class='countdown-number'>%-D</div> <div class='countdown-unit'>Day</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hrs</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Min</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Sec</div> </div></div>"
                    )
                );
            });
          } 
        }
        
        HOMEINITTEMPLATE($);
      }, 50);
    })

    this.homeService.getConfig().subscribe((configResp: any) => {
    // carga configuración dinámica
    this.tasaCambio_bcv = configResp.tasaCambio_bcv;
    console.log('Configuración cargada:', configResp);
  });
  }


  OpenModal(bestProduct:any, FlashSale:any = null){
    this.product_selected = null;
  

    setTimeout(() => {
    this.product_selected = bestProduct;
    this.product_selected.FlashSale = FlashSale;

    setTimeout(() => {
    ModalProductDetail();
    }, 50);
    }, 100);
  }



  getPrice_bs(product:any){
    this.price_bs = product.price_usd*this.tasaCambio_bcv;
    return Math.round(this.price_bs*100)/100;
  }


  getCalNewPrice(product: any): number {
  if (!product || !product.price_usd) {
    return 0;
  }

  let price = product.price_usd;

  // Aplicar descuento FlashSale si existe
  if (product.FlashSale && product.FlashSale.state === 1) {  // asegúrate que el descuento esté activo
    const flashDiscount = product.FlashSale.discount;
    const flashTypeDiscount = product.FlashSale.type_discount;

    if (flashTypeDiscount === 1) {
      // Descuento porcentaje
      price = price * (1 - flashDiscount / 100);
    } else if (flashTypeDiscount === 2) {
      // Descuento monto fijo
      price = price - flashDiscount;
    }
  }

  // Aplicar descuento campaña si existe
  if (product.campaign_discount && product.campaign_discount.state === 1) {  // activo
    let campaignDiscount = product.campaign_discount.discount;
    let campaignTypeDiscount = product.campaign_discount.type_discount;

    if (campaignTypeDiscount === 1) {
      // Descuento porcentaje
      price = price * (1 - campaignDiscount / 100);
    } else if (campaignTypeDiscount === 2) {
      // Descuento monto fijo
      price = price - campaignDiscount;
    }
  }

  // Evitar precio negativo
  if (price < 0) price = 0;

  // Redondear a 2 decimales
  return Math.round(price * 100) / 100;
}

  getCalNewPriceBs(product: any): number {
  if (!product || !product.price_usd) {
    return 0;
  }

  let price = product.price_usd*this.tasaCambio_bcv;

  // Aplicar descuento FlashSale si existe
  if (product.FlashSale && product.FlashSale.state === 1) {  // asegúrate que el descuento esté activo
    const flashDiscount = product.FlashSale.discount;
    const flashTypeDiscount = product.FlashSale.type_discount;

    if (flashTypeDiscount === 1) {
      // Descuento porcentaje
      price = price * (1 - flashDiscount / 100);
    } else if (flashTypeDiscount === 2) {
      // Descuento monto fijo
      price = price - flashDiscount*this.tasaCambio_bcv;
    }
  }

  // Aplicar descuento campaña si existe
  if (product.campaign_discount && product.campaign_discount.state === 1) {  // activo
    let campaignDiscount = product.campaign_discount.discount;
    let campaignTypeDiscount = product.campaign_discount.type_discount;

    if (campaignTypeDiscount === 1) {
      // Descuento porcentaje
      price = price * (1 - campaignDiscount / 100);
    } else if (campaignTypeDiscount === 2) {
      // Descuento monto fijo
      price = price - campaignDiscount*this.tasaCambio_bcv;
    }
  }

  // Evitar precio negativo
  if (price < 0) price = 0;

  // Redondear a 2 decimales
  return Math.round(price * 100) / 100;
}

  getDiscountProduct(bestProduct:any, is_sale_flash = null){
    
    if(is_sale_flash){
      if(this.FlashSale.type_discount == 1){// por porcentaje
        return Math.round((bestProduct.price_usd*this.FlashSale.discount*0.01)*100)/100;
      }else{// por moneda
        return Math.round(this.FlashSale.discount*100)/100;
      }
    }else{
      if(bestProduct.campaign_discount){
        if(bestProduct.campaign_discount.type_discount == 1){// por porcentaje
          return Math.round((bestProduct.price_usd*bestProduct.campaign_discount.discount*0.01)*100)/100;
        }else{// por moneda
          return Math.round(bestProduct.campaign_discount.discount*100)/100;
        }
      }
    }
    return 0;
  }

  getDiscountProductBs(bestProduct:any, is_sale_flash = null){
    if(is_sale_flash){
      if(this.FlashSale.type_discount == 1){// por porcentaje
        return Math.round((bestProduct.price_usd*this.tasaCambio_bcv*this.FlashSale.discount*0.01)*100)/100;
      }else{// por moneda
        return Math.round(this.FlashSale.discount*this.tasaCambio_bcv*100)/100;
      }
    }else{
      if(bestProduct.campaign_discount){
        if(bestProduct.campaign_discount.type_discount == 1){// por porcentaje
          return Math.round((bestProduct.price_usd*this.tasaCambio_bcv*bestProduct.campaign_discount.discount*0.01)*100)/100;
        }else{// por moneda
          return Math.round(bestProduct.campaign_discount.discount*this.tasaCambio_bcv*100)/100;
        }
      }
    }
    return 0;
  }

  getRouterDiscount(bestProduct:any){
    if(bestProduct.campaign_discount){
      return {_id: bestProduct.campaign_discount._id};
    }
    return{}
  }
  
  addCart(product:any, is_sale_flash:any = null){
   
    if (!this.cartService._authService.user){
      alertDanger('Upss! Necesitas autenticarte para poder agregar productos al carrito de compras');
      return;
    }
    if($("#qty-cart").val() == 0){
      alertDanger("Upss! Necesitas agregar al carrito de compras una cantidad del producto mayor a O unidades");
      return;
    }
    if(product.type_inventario == 2){
      let LINK_DISCOUNT = "";
      if(is_sale_flash){
        LINK_DISCOUNT = "?_id="+this.FlashSale._id;
      }else{
        if(product.campaign_discount){
          LINK_DISCOUNT = "?_id="+product.campaign_discount._id;
        }
      }
      this.router.navigateByUrl("/landing-producto"+product.slug+LINK_DISCOUNT)
    }
    let type_discount:any =null;
    let discount:any = 0;
    let code_discount:any = null;

    if(is_sale_flash){
      type_discount = this.FlashSale.type_discount;
      discount = this.FlashSale.discount;
      code_discount =  this.FlashSale._id;

    }else{
      if(product.campaign_discount){
        type_discount = product.campaign_discount.type_discount;
        discount = product.campaign_discount.discount;
        code_discount = product.campaign_discount._id;

      }
    }
    let data = {
      user: this.cartService._authService.user._id,
      product: product._id,
      type_discount: type_discount,
      discount: discount,
      cantidad: $("#qty-cart").val(),
      variedad: null,
      code_cupon: null,
      code_discount: code_discount,
      price_unit: product.price_usd,
      subtotal: product.price_usd - this.getDiscountProduct(product, is_sale_flash),  // 1
      total: (product.price_usd - this.getDiscountProduct(product, is_sale_flash)) * $("#qty-cart").val(),

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

  goToRegisterSellerForm(){
     window.location.href = URL_FROTEND_ADM+"auth/registro-seller"
   }
}







