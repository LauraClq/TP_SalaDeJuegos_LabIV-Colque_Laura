import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginFormulario: FormGroup;
  private AuthServicio = inject(AuthService)

  constructor(private formBuilder: FormBuilder, private route: Router) 
  {
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
          Swal.fire({
            icon: 'success',
            title: `Bienvenido ${res.user.email}`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['home']);
        })
        .catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese una dirección de correo electrónico o contraseña válida.',
          });
        });
    }
  }
}
