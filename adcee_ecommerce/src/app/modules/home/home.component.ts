import { Component, OnInit } from '@angular/core';
import { HomeService } from './_services/home.service';

declare var $:any;
declare function HOMEINITTEMPLATE([]):any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliders:any = [];
  categories:any = [];
  bestProducts:any = [];
  our_products: any = [];
  donation_products:any = [];

  
  constructor(
    public homeService: HomeService,
  ) {}

  title = 'adcee_ecommerce';
  ngOnInit():void {

    this.homeService.listHome().subscribe((resp:any) =>{
      console.log(resp);
      this.sliders = resp.sliders;
      this.categories = resp.categories;
      this.bestProducts = resp.best_products;
      this.our_products = resp.our_products;
      this.donation_products = resp.donation_products;


      setTimeout(() => {
        HOMEINITTEMPLATE($);
      }, 70);
    })
  }

  
}







