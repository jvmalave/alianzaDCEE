import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';

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
        alert("ES NECESARIO INGRESAR EL EMAIL");
      }

      if(!this.password){
        alert("ES NECESARIO INGRESAR LA CONTRASEÑA");
      }

      this.AuthService.login(this.email, this.password).subscribe((resp:any) => {
        console.log(resp);
        if(!resp.error && resp){
          //SIGNIFICA QUE EL USUARIO INGRESO CON EXITO
          this.router.navigate(["/"])


        }else{
          alert(resp.error.message);
        }
      })
    }
  

}
