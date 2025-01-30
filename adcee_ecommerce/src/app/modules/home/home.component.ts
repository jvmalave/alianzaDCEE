import { Component, OnInit } from '@angular/core';

declare var $:any;
declare function HOMEINITTEMPLATE([]):any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor() {}

  title = 'adcee_ecommerce';
  ngOnInit():void {
    setTimeout(() => {
      HOMEINITTEMPLATE($);
    }, 70);

  }
}







