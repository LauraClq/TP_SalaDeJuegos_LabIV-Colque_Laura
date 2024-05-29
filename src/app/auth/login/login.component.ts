import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { SwalService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginFormulario: FormGroup;
  private AuthServicio = inject(AuthService);
  selected: string = '';

  constructor(private formBuilder: FormBuilder, private route: Router,  private SweetServicio: SwalService) {
    this.loginFormulario = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  inicarSesion() {
    if (this.loginFormulario.valid) {
      //si no hay ningun error en el formulario, recien verifica el login
      this.AuthServicio.autenticacion(
        this.loginFormulario.controls['email'].value,
        this.loginFormulario.controls['password'].value
      )
        .then((res) => {
          this.loginFormulario.reset();
          this.SweetServicio.crearSwal(`Bienvenido ${res.user.email}`,'success',1500);
          this.route.navigate(['home']);
        })
        .catch((e) => {
          this.SweetServicio.avisoSwal('Por favor, ingrese una dirección de correo electrónico o contraseña válida.','error','Error');
        });
    }
  }

  accesoRapido() {
    switch (this.selected) {
      case 'admin':
        this.loginFormulario.setValue({
          email: 'admin@gmail.com',
          password: 'admin123',
        });
        break;
      case 'invitado':
        this.loginFormulario.setValue({
          email: 'invitado@gmail.com',
          password: 'invitado12',
        });
        break;
      case 'anonimo':
        this.loginFormulario.setValue({
          email: 'anonimo@gmail.com',
          password: 'anonimo12',
        });
        break;
      default:
        this.loginFormulario.setValue({
          email: '',
          password: '',
        });
        break;
    }
  }
}
