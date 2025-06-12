import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';



declare function alertDanger([]):any; 
declare function alertSuccess([]):any;

@Component({
  selector: 'app-register-seller',
  templateUrl: './register-seller.component.html',
  styleUrls: ['./register-seller.component.css']
})
export class RegisterSellerComponent implements OnInit {

 [x: string]: any;
 
   email: string = "";
   name: string = "";
   surname: string = "";
   password: string = "";
   repeat_password: string = "";
 
   constructor(
     public AuthService: AuthService,
     public router: Router,
   ) {
     
   }
 
   ngOnInit():void {
      if(this.AuthService.user){
        this.router.navigate(['/']);
     }
 
   }
 
   registro() {
     if(!this.email ||
       !this.name ||
       !this.surname ||
       !this.password ||
       !this.repeat_password 
     ){
       alertDanger("Upss! Todos los campos son requeridos");
     }
     if(this.password !=
       this.repeat_password){
         alertDanger("Upss!  Las contraseñas deben ser iguales")
       }
     let data = {
       email: this.email,
       name: this.name,
       surname: this.surname,
       password: this.password,
       rol: "emprendedor",
     };
 
     this.AuthService.registroSeller(data).subscribe((resp:any) => {
       console.log(resp);
       alertSuccess("Super! el registro se realizó satisfactoriamente")
       this.router.navigate(["./auth/login-seller"])
       
     });
   }

}
