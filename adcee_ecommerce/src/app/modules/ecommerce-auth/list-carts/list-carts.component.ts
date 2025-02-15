import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../ecommerce-guest/_services/cart.service';

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
    totalCarts:any = 0;
  
    constructor(
      public router: Router,
      public cartService: CartService,
    ){}
  
    code_cupon:any = null;
    ngOnInit(): void {
      setTimeout(() => {
        sectionCart();
      }, 25);
      this.cartService.currentDataCart$.subscribe((resp: any) => {
        console.log(resp);
        this.listCarts = resp;
        this.totalCarts = this.listCarts.reduce((sum:any,item:any) => sum + item.total, 0);
      })
    }
    dec(cart:any){
      if(cart.cantidad - 1 == 0){
        alertDanger("Upps! No puede disminuir un producto a cero(0)");
        return;
      }
      cart.cantidad = cart.cantidad - 1;
      cart.subtotal = cart.price_unit * cart.cantidad;
      cart.total = cart.price_unit * cart.cantidad;


      //AQUI VA LA FUNCION PARA ENVIARLO AL SERVICE O BACKEND
      console.log(cart,"DEC");
      let data = {
        _id: cart._id,
        cantidad:  cart.cantidad ,
        subtotal: cart.subtotal,
        total: cart.total,
        variedad: cart.variedad ? cart.variedad._id : null,
        product: cart.product._id
      }
      this.cartService.updateCart(data).subscribe((resp:any) =>{
        console.log(resp);
      })
    }

    inc(cart:any){
      console.log(cart,"INC");

      cart.cantidad = cart.cantidad + 1;
      cart.subtotal = cart.price_unit * cart.cantidad;
      cart.total = cart.price_unit * cart.cantidad;


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

      //AQUI VA LA FUNCION PARA ENVIARLO AL SERVICE O BACKEND
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

