import { Component, OnInit } from '@angular/core';
import { EcommerceAuthService } from '../_services/ecommerce-auth.service';

declare function alertDanger([]):any;
declare function alertSuccess([]):any;

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  sale_orders:any = [];
  is_detail_sale:any = false;
  order_selected:any = null;

  //Address
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

  //datos del cliente
  name_c:any = null;
  surname_c:any = null;
  email_c:any = null;
  password:any = null;
  password_repeat:any = null;

  //Review
  cantidad:any = 0;
  description:any = null;
  sale_detail_selected:any = null;





  constructor(
    public authEcommerceService: EcommerceAuthService 
  
  ) { }

  ngOnInit(): void {
    this.showProfileClient();
    this.name_c = this.authEcommerceService.authService.user.name;
    this.surname_c = this.authEcommerceService.authService.user.surname;
    this.email_c = this.authEcommerceService.authService.user.email;
  }

  showProfileClient(){
    let data = {
      user_id: this.authEcommerceService.authService.user._id,

    }
    this.authEcommerceService.showProfileClient(data).subscribe((resp:any) => {
      console.log(resp);
      this.sale_orders = resp.sale_orders;
      this.listAddressClient = resp.address_client;
    })
  }

  getDate(date:any){
    let newDate = new Date(date);
    return `${newDate.getDay()}/${newDate.getMonth()+ 1}/${newDate.getFullYear()}`;
  }

  viewDetailSale(order:any){
    this.is_detail_sale = true;
    this.order_selected = order;
  }

  goHome(){
    this.is_detail_sale = false;
    this.order_selected = null;
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
      user: this.authEcommerceService.authService.user._id,
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
    this.authEcommerceService.registerAddressClient(data).subscribe((resp:any) => {
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
      user: this.authEcommerceService.authService.user._id,
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
    this.authEcommerceService.updateAddressClient(data).subscribe((resp:any) => {
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

  updateProfileClient(){
    //password_repeat
    if(this.password){
      if(this.password != this.password_repeat){
        alertDanger("Upss! Las contreseñas no coinciden")
        return;
      }
    }
    let data = {
      _id: this.authEcommerceService.authService.user._id,
      name: this.name_c,
      surname: this.surname_c,
      email: this.email_c,
      password: this.password,
    };
    this.authEcommerceService.updateProfileClient(data).subscribe((resp:any) => {
      console.log(resp);
      alertSuccess(resp.message)
      if(resp.user){
      localStorage.setItem("user", JSON.stringify(resp.user));
      }
    })
  }

  viewReview(sale_detail:any){
    this.sale_detail_selected = sale_detail;
    if(this.sale_detail_selected.review){
      this.cantidad = this.sale_detail_selected.review.cantidad;
      this.description = this.sale_detail_selected.review.description;
    }else{
      this.cantidad = null;
      this.description = null;
    }
  }

  goDetail(){
    this.sale_detail_selected = null;
  }

  addCantidad(cantidad:number){
    this.cantidad = cantidad;
  }

  save(){
    if(this.sale_detail_selected.review){
      this.updateReview();
    }else{ 
      this.saveReview();
    }
  }

  saveReview(){
    if(!this.cantidad || !this.description){
      alertDanger("Upss! Selecciona un número de estrella y has una reseña del producto");
      return;
    }
    let data = {
      product: this.sale_detail_selected.product._id,
      sale_detail: this.sale_detail_selected._id,
      user:this.authEcommerceService.authService.user._id,
      cantidad: this.cantidad,
      description: this.description,
    }

    this.authEcommerceService.registerProfileClientReview(data).subscribe((resp:any) => {
      console.log(resp);
      this.sale_detail_selected.review = resp.review;
      alertSuccess("Super! La reseña se registró satisfactoriamente")
    })
  }

  updateReview(){
    if(!this.cantidad || !this.description){
      alertDanger("Upss! Selecciona un número de estrella y has una reseña del producto");
      return;
    }
    let data = {
      _id: this.sale_detail_selected.review._id,
      product: this.sale_detail_selected.product._id,
      sale_detail: this.sale_detail_selected._id,
      user:this.authEcommerceService.authService.user._id,
      cantidad: this.cantidad,
      description: this.description,
    }

    this.authEcommerceService.updateProfileClientReview(data).subscribe((resp:any) => {
      console.log(resp);
      this.sale_detail_selected.review = resp.review;
      alertSuccess("Super! La reseña se actualizó satisfactoriamente")
    })
  }

  logout(){
    this.authEcommerceService.authService.logout();
  }
}
