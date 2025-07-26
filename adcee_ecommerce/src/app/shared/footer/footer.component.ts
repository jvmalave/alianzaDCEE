import { Component } from '@angular/core';
import {URL_FROTEND_ADM } from '../../config/config'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

 goToRegisterSellerForm(){
      window.location.href = URL_FROTEND_ADM+"auth/registro-seller"
    }

}
