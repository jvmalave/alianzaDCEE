import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login-seller',
  templateUrl: './login-seller.component.html',
  styleUrls: ['./login-seller.component.scss']
})
export class LoginSellerComponent implements OnInit, OnDestroy {

   // KeenThemes mock, change it to:
    // defaultAuth = {
    //   email: '',
    //   password: '',
    // };
    defaultAuth: any = {
      email: 'admin@demo.com',
      password: 'demo',
    };
    loginForm: FormGroup;
    hasError: boolean;
    returnUrl: string;
    isLoading$: Observable<boolean>;
  
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.isLoading$ = this.authService.isLoading$;
      // redirect to home if already logged in
      // if (this.authService.currentUserValue) {
      //   this.router.navigate(['/']);
      // }
      if (this.authService.isLogued()) {
        this.router.navigate(['/']);
      }
    }
  
    ngOnInit(): void {
      this.initForm();
      // get return url from route parameters or default to '/'
      this.returnUrl =
          this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
      }
  
    // convenience getter for easy access to form fields
    get f() {
      return this.loginForm.controls;
    }
  
    initForm() {
      this.loginForm = this.fb.group({
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), 
          ]),
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        rol: ['emprendedor', Validators.required],
      });
    }
  
    submit() {
      this.hasError = false;
      // const loginSubscr = this.authService
      //   .login(this.f.email.value, this.f.password.value)
      //   .pipe(first())
      //   .subscribe((user: UserModel) => {
      //     if (user) {
      //       this.router.navigate([this.  returnUrl]);
      //     } else {
      //       this.hasError = true;
      //     }
      //   });
      this.authService.login(this.f.email.value, this.f.password.value, this.f.rol.value).subscribe((resp:any)=>{
        console.log(resp)
        // this.router.navigate(['/dashboard']);
        if (resp) {
            // this.router.navigate([this.  returnUrl]);
            document.location.reload();
        } else {
            this.hasError = true;
        }
      },(error:any)=>{
        console.log(error)
        if(error.error.error=="Unauthorized"){
          // this.toastr.error('Upps!!', 'Las Credenciales Ingresadas No Existen');
          this.hasError = true;
        }else{
          // this.toastr.error('Upps!!', 'Sucedio Algo Inesperado.Intentelo nuevamente');
          this.hasError = true;
        }
      })
      // this.unsubscribe.push(loginSubscr);
    }
  
    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}
