import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EcommerceAuthService } from '../_services/ecommerce-auth.service';
import { CartService } from '../../ecommerce-guest/_services/cart.service';
import { Pipe, PipeTransform } from '@angular/core';




@Pipe({ name: 'bsFormat' })
export class BsFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return '0,00 Bs.';

    // Redondear a 2 decimales
    const rounded = Math.round(value * 100) / 100;
    
    // Formatear con separadores
    const formatted = rounded.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `${formatted} Bs.`;
  }
}


declare function alertDanger([]):any;
declare function alertSuccess([]):any;
declare var paypal:any;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})



export class CheckoutComponent implements OnInit {

  @ViewChild('paypal',{static: true}) paypalElement?: ElementRef;

  selectedPaymentMethod: string = '';
  pagoMovilData: any = {};
  transferenciaData: any = {};
  selectedFile: File | null = null;

  listAddressClient:any = [];
  name:any = null;
  surname:any = null;
  country:any = "Venezuela";
  address:any = null;
  reference:any = null;
  region:any = null;
  city:any = null;
  township:any = null;
  phone:any = null;
  email:any = null;
  note:any = null;

  address_client_selected:any = null;
  listCarts:any = [];
  totalCarts: any = 0;
  tasaBcv: any = 0

  constructor(
    public authEcommerce: EcommerceAuthService,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.authEcommerce.listAddressClient(this.authEcommerce.authService.user._id).subscribe((resp:any) => {
      console.log(resp);
      this.listAddressClient = resp.address_client;
    })
    this.cartService.currentDataCart$.subscribe((resp:any) => {
      console.log(resp);
      this.tasaBcv = 86.85;
      this.listCarts = resp;
      this.totalCarts = this.listCarts.reduce((sum:any,item:any) => sum + item.total, 0);
      this.pagoMovilData.monto = this.totalCarts;
      this.pagoMovilData.montoBs = this.totalCarts * this.tasaBcv;
      this.transferenciaData.monto = this.totalCarts;
      this.transferenciaData.montoBs = this.totalCarts * this.tasaBcv;
    })
    
    paypal.Buttons({
      // optional styling for buttons
      // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
      style: {
        color: "gold",
        shape: "rect",
        layout: "vertical"
      },

      // set up the transaction
      createOrder: (data:any, actions:any) => {
          // pass in any options from the v2 orders create call:
          // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
          if(this.listCarts.length == 0){
            alertDanger(" Upss! El carro esta vacío. No se puede procesar la orden");
            return;
          }
          if(!this.address_client_selected){
            alertDanger("Upss! Debe seleccionar una dirección de envío");
            return;
          }

          const createOrderPayload = {
            purchase_units: [
              {
                amount: {
                    description: "COMPRAR POR EL ECOMMERCE",
                    value: this.totalCarts
                }
              }
            ]
          };

          return actions.order.create(createOrderPayload);
      },

      // finalize the transaction
      onApprove: async (data:any, actions:any) => {
          
          let Order = await actions.order.capture();
  
          // Order.purchase_units[0].payments.captures[0].id

          let sale = {
            user: this.authEcommerce.authService.user._id,
            currency_payment: 'USD',
            method_payment: 'PAYPAL',
            n_transaction:  Order.purchase_units[0].payments.captures[0].id,
            total: this.totalCarts,
          };

          let sale_address = {
            name:this.name,
            surname:this.surname,
            country:this.country,
            address:this.address,
            reference:this.reference,
            city:this.city,
            region:this.region,
            township:this.township,
            phone:this.phone,
            email:this.email,
            note:this.note,
          }

          this.authEcommerce.registerSale({sale: sale, sale_address: sale_address }).subscribe((resp:any) => {
            console.log(resp);
            alertSuccess(resp.message);
            location.reload();

          })

          //return actions.order.capture().then(captureOrderHandler);
      },

      // handle unrecoverable errors
      onError: (err:any) => {
          console.error('An error prevented the buyer from checking out with PayPal');
      }
    }).render(this.paypalElement?.nativeElement);
  }





  store(){
    if(this.address_client_selected){
      this.updateAddress();
    }else{
      this.registerAddress();
    }
  }

  registerAddress(){
    if(!this.name ||
      !this.surname
      || !this.country
      || !this.address
      || !this.region
      || !this.city
      || !this.township
      || !this.phone ||
      !this.email){
      alertDanger("Upss!. Es necesario que ingreses los campos obligatorios de la dirección");
      return;
    }
    let data = {
      user: this.authEcommerce.authService.user._id,
      name:this.name,
      surname:this.surname,
      country:this.country,
      address:this.address,
      reference:this.reference,
      region:this.region,
      city:this.city,
      township:this.township,
      phone:this.phone,
      email:this.email,
      note:this.note,
    };
    this.authEcommerce.registerAddressClient(data).subscribe((resp:any) => {
      console.log(resp);
      this.listAddressClient.push(resp.address_client);
      alertSuccess(resp.message);
      this.resetFormulario();
    })
  }

  updateAddress(){
    if(!this.name ||
      !this.surname
      || !this.country
      || !this.address
      || !this.region
      || !this.city
      || !this.township
      || !this.phone ||
      !this.email){
      alertDanger("Upss!. Es necesario que ingreses los campos obligatorios de la dirección");
      return;
    }
    let data = {
      _id: this.address_client_selected._id,
      user: this.authEcommerce.authService.user._id,
      name:this.name,
      surname:this.surname,
      country:this.country,
      address:this.address,
      reference:this.reference,
      region:this.region,
      city:this.city,
      township:this.township,
      phone:this.phone,
      email:this.email,
      note:this.note,
    };
    this.authEcommerce.updateAddressClient(data).subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.listAddressClient.findIndex((item:any) => item._id == this.address_client_selected._id);
      this.listAddressClient[INDEX] = resp.address_client;
      alertSuccess(resp.message);
    })
  }

  resetFormulario(){
  this.name = null;
  this.surname = null;
  this.country = "Venezuela";
  this.address = null;
  this.reference = null;
  this.region= null;
  this.city = null;
  this.township = null;
  this.phone = null;
  this.email = null;
  this.note = null;
  }

  newAddress(){
    this.resetFormulario();
    this.address_client_selected = null; 
  }

  addressClientSelected(list_address:any){
    this.address_client_selected = list_address;
    this.name = this.address_client_selected.name;
    this.surname = this.address_client_selected.surname;
    this.country = this.address_client_selected.country;
    this.address = this.address_client_selected.address;
    this.reference = this.address_client_selected.reference;
    this.region= this.address_client_selected.region;
    this.city = this.address_client_selected.city;
    this.township = this.address_client_selected.township;
    this.phone = this.address_client_selected.phone;
    this.email = this.address_client_selected.email;
    this.note = this.address_client_selected.note;
  }

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitPagoMovil() {
    const formData = new FormData();
    formData.append('monto', this.pagoMovilData.monto);
    formData.append('montoBs', this.pagoMovilData.montoBs);
    formData.append('banco', this.pagoMovilData.banco);
    formData.append('referencia', this.pagoMovilData.referencia);
    formData.append('telefono', this.pagoMovilData.telefono);
    if (this.selectedFile) {
      formData.append('comprobante', this.selectedFile);
    }
  }
  submitTransferencia() {
    const formData = new FormData();
    formData.append('monto', this.transferenciaData.monto);
    formData.append('montoBs', this.transferenciaData.montoBs);
    formData.append('banco', this.transferenciaData.banco);
    formData.append('referencia', this.transferenciaData.referencia);
    if (this.selectedFile) {
      formData.append('comprobante', this.selectedFile);
    }
  }
}


