// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

export interface Payment {
  _id: string;
  n_transaction: string;
  total_Bs: number;
  method_payment: string;
  phone?: string;
  bank: string;
  products: Array<{
    product: { name: string; price: number; seller_id?: any };
    quantity: number;
    seller_id?: any;
  }>;
  user: { name: string; email: string };
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  

  constructor(private http: HttpClient) {}

  getPendingPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${URL_SERVICIOS}/payment/admin/pending`);
  }

  updatePaymentStatus(id: string, status: 'confirmado' | 'rechazado'): Observable<any> {
    return this.http.put(`${URL_SERVICIOS}/admin/${id}`, { status });
  }
}
