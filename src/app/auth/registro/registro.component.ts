import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import Swal from 'sweetalert2';
import { Usuario } from '../model/Usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  public registroFormulario: FormGroup;
  private AuthServicio = inject(AuthService);

  constructor(private formBuilder: FormBuilder, private route: Router, private firestore: AngularFirestore) 
  {
    this.registroFormulario = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
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

  registro() {

    if (this.registroFormulario.valid)
    {
      this.AuthServicio.registro(this.registroFormulario.value as Usuario)
        .then(async (userCredenciales) => {
          
          const uid = userCredenciales.user.uid; //guardo el id
          delete this.registroFormulario.value.password; //elimino el password
          const datosUser = { ...this.registroFormulario.value}; //guardo los datos del usuario creado, obtenidos del formulario
          datosUser.uid = uid; //guardo el id generado automaticamte
          await this.firestore.collection("usuarios").doc(uid).set(datosUser);
          Swal.fire({
            icon: 'success',
            title: `Registro exitoso!! Bienvenido ${datosUser.username}`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.registroFormulario.reset();
          this.route.navigate(['home']);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: this.AuthServicio.crearMensajeError(error.code),
          });
        });
    }
  }
}
