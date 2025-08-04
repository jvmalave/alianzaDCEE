import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../ecommerce-guest/_services/cart.service';
import { HomeService } from '../../home/_services/home.service';


declare function sectionCart():any;
declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;
@Component({
  selector: 'app-list-carts',
  templateUrl: './list-carts.component.html',
  styleUrls: ['./list-carts.component.css']
})
export class ListCartsComponent {

   listCarts:any = [];
   subtotalCarts = 0;
   totalCarts:any = 0;

   tasaCambio_bcv: any = 0;
   porc_iva: any = 0;

  
    constructor(
      public router: Router,
      public cartService: CartService,
      public homeService: HomeService,
      private cdr: ChangeDetectorRef,
    ){}
  
    code_cupon:any = null;

    ngOnInit(): void {
      this.cartService.currentDataCart$.subscribe((resp: any) => {
      console.log("CART",resp);
      this.listCarts = resp;
      this.totalCarts = this.listCarts.reduce((sum:any,item:any) => sum + item.total, 0); 
      this.cdr.detectChanges();  // fuerza actualización de la vista sin errores
    });

    this.homeService.getConfig().subscribe((configResp: any) => {
    // carga configuración dinámica
    this.tasaCambio_bcv = configResp.tasaCambio_bcv;
    this.porc_iva = configResp.porc_iva;
    console.log('Configuración cargada:', configResp);
  });
  }

    dec(cart:any){
      
      if(cart.cantidad - 1 == 0){
        alertDanger("Upps! No puede disminuir un producto a cero(0)");
        return;
      }
      cart.cantidad = cart.cantidad - 1;
      cart.subtotal = Math.round(cart.price_unit * cart.cantidad*100)/100;
      cart.total = Math.round(cart.price_unit * cart.cantidad*100)/100;
      

      //AQUI VA LA FUNCION PARA ENVIARLO AL SERVICE O BACKEND
      
      let data = {
        _id: cart._id,
        cantidad:  cart.cantidad ,
        subtotal: cart.subtotal,
        total: cart.total,
        variedad: cart.variedad ? cart.variedad._id : null,
        product: cart.product._id
      }
      this.cartService.updateCart(data).subscribe((resp:any) =>{
        console.log("DEC",resp);
        console.log ("DATA-DEC", data);
      })
    }

    priceUnitBs(cart:any){
      const priceUnitBs = Math.round(cart.price_unit * this.tasaCambio_bcv*100)/100;
      return(priceUnitBs);
    }

    subtotalBs(cart:any){
      const subtotalBs = Math.round(cart.subtotal * this.tasaCambio_bcv);
      return(subtotalBs);
    }

    iva(){
      const iva = Math.round(this.totalCarts * (this.porc_iva*0.01)*100)/100;
      return iva;
    }

    ivaBs(){
      const ivaBs = Math.round(this.totalCarts *(this.porc_iva*0.01)*this.tasaCambio_bcv*100)/100;
      return ivaBs;
    }

    totalCartsBs(){
      const totalCartsBs = Math.round(this.totalCarts * this.tasaCambio_bcv*100)/100;
      return totalCartsBs
    }

    inc(cart:any){
      console.log(cart,"INC");

      cart.cantidad = cart.cantidad + 1;
      cart.subtotal = Math.round(cart.price_unit * cart.cantidad*100)/100;
      cart.total = Math.round(cart.price_unit * cart.cantidad*100)/100;


      let data = {
        _id: cart._id,
        cantidad:  cart.cantidad,
        subtotal: cart.subtotal,
        total: cart.total,
        variedad: cart.variedad ? cart.variedad._id : null,
        product: cart.product._id
      }
      
      
      this.cartService.updateCart(data).subscribe((resp:any) =>{
        console.log(resp);

      
    })
    }
    removeCart(cart:any){
      this.cartService.deleteCart(cart._id).subscribe((resp:any) =>{
        console.log(resp);
        this.cartService.removeItemCart(cart);
      })
    }
    aplicarCupon(){
      let data = {
        code: this.code_cupon,
        user_id: this.cartService._authService.user._id,
      }
      this.cartService.aplicarCupon(data).subscribe((resp:any) => {
        console.log(resp);
        if(resp.message == 403){
          alertDanger(resp.message_text);
        }else{
          alertSuccess(resp.message_text);

          this.lisCarts();
        }
      })

    }
    lisCarts(){
      this.cartService.resetCart();
            if(this.cartService._authService.user){
              this.cartService.listCarts(this.cartService._authService.user._id).subscribe((resp:any) => {
                console.log(resp);
                // this.listCarts = resp.carts;
        
                resp.carts.forEach((cart:any) => {
                  this.cartService.changeCart(cart);
                });
              });
            }
    }
    }

