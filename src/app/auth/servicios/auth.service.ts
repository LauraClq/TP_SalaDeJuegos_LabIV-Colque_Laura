import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, Firestore} from '@angular/fire/firestore';
import { Usuario } from '../model/Usuario.model';
import { SwalService } from '../../services/sweetalert.service';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Usuario;
  private auth = inject(Auth);
  private authServ = inject(AngularFireAuth);
  private firestore = inject(Firestore);
  private firestoreServ = inject(AngularFirestore);
  private swalService = inject(SwalService);
  private router = inject(Router);
  usuario$: Observable<any>;

  constructor() {
    this.usuario$ = this.authServ.authState.pipe(
      switchMap((usuario) => {
        if (usuario) {
          return this.firestoreServ
            .doc<Usuario>(`usuarios/${usuario.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async autenticacion(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password).then(
      (res) => {
        if (res.user) {
          this.guardarLogin(email);
        }
        return res;
      }
    );
  }

  async registro(user: Usuario) {
    return await createUserWithEmailAndPassword(this.auth,user.email,user.password).then((res) =>{
      if (res.user) {
        this.guardarLogin(user.email);
      }
      return res;
    })
  }

  guardarLogin(email: string) {
    const date = new Date();
    const loginDatos = {
      email: email,
      date: date,
    };
    this.save(loginDatos, 'LoginLog');
  }

  //GUARDAR EN FIREBASE EL LOS LOGS DE LOS LOGIN
  private save(data: any, path: string) {
    const col = collection(this.firestore, path);
    addDoc(col, data);
  }

  //OBTENER ESA COLECCION DE DATOS ALMACENADOS
  get(path: string) {
    const col = collection(this.firestore, path);
    const observable = collectionData(col);
    return observable;
  }

  //Cerrar sesion
  cerrarSesion() {
    this.auth.signOut();
    this.swalService.crearSwal(
      'Sesión cerrada. Hasta la próxima',
      'success',
      1500
    );
    this.router.navigate(['/auth/login']);
  }

  getAuth() {
    return getAuth(); //Este lo que hace es devulve si un true false si hay un usuario autenticado
  }

  public crearMensajeError(error: string): string {
    let mensajeTipoError!: string;
    switch (error) {
      case 'auth/email-already-in-use':
        mensajeTipoError = 'El email ya está registrado.';
        break;
      case 'auth/wrong-password':
        mensajeTipoError = 'La contraseña ingresada es incorrecta';
        break;
      case 'auth/invalid-email':
        mensajeTipoError = 'La dirección de correo electrónico es incorrecta.';
        break;
      default:
        mensajeTipoError = 'Se produjo un error durante el inicio de sesión.';
        break;
    }
    return mensajeTipoError;
  }
}