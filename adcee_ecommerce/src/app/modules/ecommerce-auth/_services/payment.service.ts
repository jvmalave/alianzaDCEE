import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth-profile/_service/auth.service';


@Injectable({ providedIn: 'root' })
export class PaymentService {

    constructor(
      public authService: AuthService,
      public http: HttpClient,
      ) {}

    createPayment(paymentData: any): Observable<any> {
      let headers = new HttpHeaders({'token': this.authService.token});
      let URL = URL_SERVICIOS+'payment';
      return this.http.post(URL, paymentData,{headers:headers});
    }
}
