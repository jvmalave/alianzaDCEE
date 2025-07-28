import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';

declare function alertDanger(message: string): any;
declare function alertSuccess(message: string): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public AuthService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (this.AuthService.user) {
      this.router.navigate(['/']);
    }

    // Crear el formulario reactivo con validaciones
    this.registroForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]],
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+( [a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+)*$')
      ]],
      surname: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+( [a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+)*$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      repeat_password: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para comprobar que password y repeat_password coinciden
  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const repeatPass = group.get('repeat_password')?.value;
    return pass === repeatPass ? null : { notMatching: true };
  }

  registro() {
    if (this.registroForm.invalid) {
      alertDanger("Upss! Por favor completa correctamente todos los campos");
      return;
    }

    // Extraer valores del formulario
    const data = {
      email: this.registroForm.value.email,
      name: this.registroForm.value.name,
      surname: this.registroForm.value.surname,
      password: this.registroForm.value.password,
      acceptTerms: this.registroForm.value.acceptTerms,
      rol: "cliente"
    };

    this.AuthService.registro(data).subscribe(
      (resp: any) => {
        console.log(resp);
        alertSuccess("¡Super! El registro se realizó satisfactoriamente");
        this.router.navigate(["/auth/login"]);
      },
      (error) => {
        alertDanger("Hubo un error al registrar el usuario");
        console.error(error);
      }
    );
  }
}
