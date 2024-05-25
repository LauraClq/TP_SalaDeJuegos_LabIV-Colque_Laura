import { Injectable, inject } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Mensaje } from '../features/chat/Mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private firestoreServ = inject(AngularFirestore);
  constructor() {}

  GuardarChats(mensaje: Mensaje){
    this.firestoreServ.collection<Mensaje>('chats').add(mensaje);
  }

  TraerChats(){
    const colecionMensajes =  this.firestoreServ.collection<Mensaje>('chats', (ref) => ref.orderBy('fecha', 'asc'));
    return colecionMensajes.valueChanges();
  }
}
