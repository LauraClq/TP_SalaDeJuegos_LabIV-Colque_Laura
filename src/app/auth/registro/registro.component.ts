import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../model/Usuario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SwalService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  public registroFormulario: FormGroup;
  private AuthServicio = inject(AuthService);
  public mensaje: string;

  constructor(private formBuilder: FormBuilder, private route: Router, private firestore: AngularFirestore, private SweetServ: SwalService) 
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
          this.SweetServ.crearSwal(`Registro exitoso!! Bienvenido ${datosUser.username}`,'success',1500);
          this.registroFormulario.reset();
          this.route.navigate(['home']);
        })
        .catch((error) => {
          this.mensaje = this.AuthServicio.crearMensajeError(error.code);
          this.SweetServ.avisoSwal(this.mensaje,'error','Uuuups...')
        });
    }
  }
}

