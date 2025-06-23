import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';



declare function alertDanger([]):any; 
declare function alertSuccess([]):any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  email: string = "";
  name: string = "";
  surname: string = "";
  password: string = "";
  repeat_password: string = "";
  acceptTerms: boolean = false;

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
      !this.repeat_password ||
      !this.acceptTerms 
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
      acceptTerms: this.acceptTerms,
      rol: "cliente",
    };

    this.AuthService.registro(data).subscribe((resp:any) => {
      console.log(resp);
      alertSuccess("Super! el registro se realizó satisfactoriamente")
      this.router.navigate(["/auth/login"]);
    });
  }
}
