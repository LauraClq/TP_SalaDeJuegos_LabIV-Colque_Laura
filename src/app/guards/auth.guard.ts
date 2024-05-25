import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

const authService = inject(AuthService);
const router = inject(Router); 
return new Promise((resolve) =>{
  authService.getAuth().onAuthStateChanged((auth) =>{
    if (!auth) {
      resolve(true);
    }else{
    router.navigate(['/auth/login']);
    resolve(false);
    }
  })

  });
 /*  return inject(AuthService).estaLogueado; Despues ver eso*/

};
