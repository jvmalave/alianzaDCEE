import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @Output() UserC: EventEmitter<any> = new EventEmitter();

  addUserForm!: FormGroup; // Declaramos el formulario reactivo con operador non-null

  constructor(
    public modal: NgbActiveModal,
    public userService: UsersService,
    public toaster: Toaster,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Inicializamos el formulario reactivo con validadores
    this.addUserForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      surname: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      email: ['', [
              Validators.required,
              Validators.email,
              Validators.minLength(6),
              Validators.maxLength(32),
            ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      repeat_password: [null, Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  // Validador personalizado para validar que password y repeat_password coincidan
  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value ?? '';
    const repeatPassword = form.get('repeat_password')?.value ?? '';
    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  save() {
    if (this.addUserForm.invalid) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-'Upss! Por favor completa correctamente todos los campos.'` });
      return;
    }

    // Extraemos los datos de forma segura
    const data = {
      name: this.addUserForm.value.name,
      surname: this.addUserForm.value.surname,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      repeat_password: this.addUserForm.value.repeat_password
    };

    this.userService.createUser(data).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.UserC.emit(resp.user);
        this.toaster.open(NoticyAlertComponent, { text: `success-'Super! El usuario se registró satisfactoriamente'` });
        this.modal.close();
      },
      error: (error) => {
        if (error.error) {
          this.toaster.open(NoticyAlertComponent, { text: `danger-'${error.error.message}'` });
        } else {
          this.toaster.open(NoticyAlertComponent, { text: `danger-'Ocurrió un error inesperado.'` });
        }
      }
    });
  }
}
