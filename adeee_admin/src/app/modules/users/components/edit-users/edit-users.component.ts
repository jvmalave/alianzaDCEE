import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  @Input() user_selected:any

 @Output() UserE: EventEmitter<any> = new EventEmitter();
   name:any = null;
   surname:any = null;
   email:any = null;
   company: any = null;
   nif: any = null
   description_company: any = null;
   address: any = null;
   phone:any = null; 
   rol_selected: any = null;
   password:any = null;
   repeat_password:any = null;


  
   constructor(
     public modal: NgbActiveModal,
     public userService: UsersService,
     public toaster: Toaster,
   ) { }

  
   ngOnInit(): void {
    this.name = this.user_selected.name;
    this.surname = this.user_selected.surname;
    this.email = this.user_selected.email;
    this.company = this.user_selected.company;
    this.nif = this.user_selected.nif;
    this.description_company = this.user_selected.description_company;
    this.address = this.user_selected.address;
    this.phone = this.user_selected.phone;
    this.rol_selected = this.user_selected.rol;
   }

   
 
   save(){
     if(!this.name || !this.surname || !this.email){
       //TODOS LOS CAMPOS SON OBLIGATARIOS
       this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Los campos Nombre, Apellido y Email no puede estar vacío'`});
       return;
     }
    //  if(this.password != this.repeat_password){
    //    this.toaster.open(NoticyAlertComponent,{text: `danger-'Upss! Necesita ingresar contraseña iguales'`});
    //    return;
    //  }
 
     let data = {
      _id: this.user_selected._id,
       name: this.name,
       surname: this.surname,
       email: this.email,
       company: this.company,
       nif: this.nif,
       description_company: this.description_company,
       address: this.address,
       phone: this.phone,
       password: this.password,
       repeat_password: this.repeat_password,
     }

     this.userService.updateUser(data).subscribe((resp:any) => {
       console.log(resp);
       this.UserE.emit(resp.user);
       this.toaster.open(NoticyAlertComponent,{text: `success-'Super! El usuario se actualizó satisfactoriamente'`});
       this.modal.close();
     },(error) =>{
       if(error.error){
         this.toaster.open(NoticyAlertComponent,{text: `danger-'${error.error.message}'`});
       }
     })
   }

}
