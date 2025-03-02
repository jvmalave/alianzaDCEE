import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../modules/ecommerce-guest/_services/cart.service';
import { fromEvent, debounceTime } from 'rxjs';
import { HomeService } from '../../modules/home/_services/home.service';
import { EcommerceGuestService } from 'src/app/modules/ecommerce-guest/_services/ecommerce-guest.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit{

  listCarts:any = [];
  totalCarts:any = 0;
  user: any;
  categories: any = null;
  search_product:any = null;
  products_search: any = [];
  isOpen: boolean = false;

  source:any;
@ViewChild("filter") filter?:ElementRef;

  constructor(
    public router: Router,
    public cartService: CartService,
    public ecommerceGuest: EcommerceGuestService,
    
  ){}

  ngOnInit(): void {

    this.ecommerceGuest.configInitial().subscribe((resp:any) => {
      console.log(resp);
      this.categories = resp.categories;
    })
    
    this.user = this.cartService._authService.user;
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

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewInit(): void {
      this.source = fromEvent(this.filter?.nativeElement, "keyup");
      this.source.pipe(debounceTime(500)).subscribe((c:any) => {
        let data = {
          search_product: this.search_product,
        }
        if(this.search_product.length > 1){
          this.cartService.searchProduct(data).subscribe((resp:any) => {
            console.log(resp);
            this.products_search = resp.products;
          })
        }
      })
    }

  isHome(){
    return this.router.url == "" || this.router.url == "/" ? true : false;
  }
  
  logout(){
    this.cartService._authService.logout();
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

  removeCart(cart:any){
    this.cartService.deleteCart(cart._id).subscribe((resp:any) =>{
      console.log(resp);
      this.cartService.removeItemCart(cart);
    })
  }

  searchProduct(){
  }

  
}
