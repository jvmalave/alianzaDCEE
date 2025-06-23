import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from '../_services/payment.service';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.scss']
})
export class ListPaymentsComponent implements OnInit {

  pagos: Payment[] = [];
  cargando = false;
  error = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos() {
    this.cargando = true;
    this.paymentService.getPendingPayments().subscribe({
      next: (data) => {
        this.pagos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error cargando pagos pendientes.';
        this.cargando = false;
      }
    });
  }

  confirmarPago(id: string) {
    if (!confirm('¿Confirmar este pago?')) return;
    this.paymentService.updatePaymentStatus(id, 'confirmado').subscribe({
      next: () => this.cargarPagos(),
      error: () => alert('Error al confirmar pago')
    });
  }

  rechazarPago(id: string) {
    if (!confirm('¿Rechazar este pago?')) return;
    this.paymentService.updatePaymentStatus(id, 'rechazado').subscribe({
      next: () => this.cargarPagos(),
      error: () => alert('Error al rechazar pago')
    });
  }

}
