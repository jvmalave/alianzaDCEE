import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    public AuthService: AuthService,
    public router: Router,
  ) {
    
  }

  ngOnInit():void {
    // if(this.AuthService.user){
    //   this.router.navigate(['/']);
    // }

  }

  registro() {
    if(!this.email ||
      !this.name ||
      !this.surname ||
      !this.password ||
      !this.repeat_password 
    ){
      alert( "TODOS LOS CAMPOS SON REQUERIDOS");
    }
    if(this.password !=
      this.repeat_password){
        alert( "LAS CONTRASEÑAS DEBE SER IGUALES")
      }
    let data = {
      email: this.email,
      name: this.name,
      surname: this.surname,
      password: this.password,
      rol: "cliente",
    };

    this.AuthService.registro(data).subscribe((resp:any) => {
      console.log(resp);
    });
  }
}
