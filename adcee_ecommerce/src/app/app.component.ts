import { Component, OnInit } from '@angular/core';

//declare var $:any;
//declare function HOMEINITTEMPLATE([]):any;
declare function sideOffcanvasToggle([],[]):any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adcee_ecommerce';
  ngOnInit():void {
    //setTimeout(() => {
    //  HOMEINITTEMPLATE($);
   // }, 70);
   setTimeout(() => {
    sideOffcanvasToggle('.cart-dropdown-btn', '#cart-dropdown');
  }, 50);
  }
}
