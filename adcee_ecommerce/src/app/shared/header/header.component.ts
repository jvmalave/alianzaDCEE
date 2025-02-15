import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../modules/ecommerce-guest/_services/cart.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  listCarts:any = [];
  totalCarts:any = 0;

  constructor(
    public router: Router,
    public cartService: CartService,
  ){}

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((resp: any) => {
      console.log(resp);
      this.listCarts = resp;
      this.totalCarts = this.listCarts.reduce((sum:any,item:any) => sum + item.total, 0);
    })
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
  inHome(){
    return this.router.url == "" || this.router.url == "/" ? true : false;
  }

  
}
