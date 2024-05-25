import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  crearSwal(mensaje: string, icon: SweetAlertIcon, timer: number): void {
    Swal.fire({
      text: mensaje,
      icon: icon,
      timer: timer,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
}
