import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';


declare function alertDanger([]):any; 
declare function alertSuccess([]):any;

@Component({
  selector: 'app-register-seller',
  templateUrl: './register-seller.component.html',
  styleUrls: ['./register-seller.component.scss']
})
export class RegisterSellerComponent implements OnInit {

  registerSellerForm: FormGroup;


  [x: string]: any;
   rol: string = "emprendedor"
   email: string = "";
   name: string = "";
   surname: string = "";
   password: string = "";
   repeat_password: string = "";
   acceptTerms: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    public AuthService: AuthService,
    public router: Router,
    public toaster: Toaster
   )
   { }

  ngOnInit(): void {
    if(this.AuthService.user){
       this.router.navigate(['/']);
     }


     this.registerSellerForm = this.fb.group({
      rol: ['emprendedor'],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
     }, 
     {validators: this.passwordMatchValidator });
  }

  // Validador personalizado para que las contraseñas coincidan
  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const repeatPass = group.get('repeat_password')?.value;
    return pass === repeatPass ? null : { notMatching: true };
  }



  registro() {
    if (this.registerSellerForm.valid) {
      console.log('FORMUELARIO VALIDO', this.registerSellerForm.value);

      let data = this.registerSellerForm.value;
      
      this.AuthService.registroSeller(data).subscribe((resp:any) => {
         console.log(resp);
         this.toaster.open(NoticyAlertComponent,{text: `success-'Super! Se ha creado tu cuenta satisfactoriamente'`});
         this.router.navigate(["auth/login-seller"]);
      });
    }else{
      console.log("FORMULARIO INVALIDO");
      this.registerSellerForm.markAllAsTouched(); 
    }
  }
}

   

