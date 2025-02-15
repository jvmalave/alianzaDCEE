import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';

declare function alertDanger([]):any;
declare function alertWarning([]):any;
declare function alertSuccess([]):any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email:string = '';
  password:string = '';
  

  constructor(
    public AuthService: AuthService,
    public router: Router,
  ){}

  ngOnInit(): void {
    //console.log(this.AuthService.user);
    if(this.AuthService.user){
      this.router.navigate(['/']);
    }
  }

    login(){

      if(!this.email){
        alertDanger("Upss! Es necesario ingresar la direccion de email registrada");
      }

      if(!this.password){
        alertDanger("Upss! Es necesario ingresar la contaseña");
      }

      this.AuthService.login(this.email, this.password).subscribe((resp:any) => {
        console.log(resp);
        if(!resp.error && resp){
          //SIGNIFICA QUE EL USUARIO INGRESO CON EXITO
          this.router.navigate(["/"]);
          alertSuccess("Super! Bienvenido al ecommerce");
        }else{
          alertDanger(resp.error.message);
        }
      })
    }
  

}
