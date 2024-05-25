import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/model/Usuario.model';
import { AuthService } from 'src/app/auth/servicios/auth.service';
import { ChatsService } from 'src/app/services/chats.service';
import { Mensaje } from './Mensaje.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  public user: Usuario | null = null;
  public mensajeAEnviar = '';
  public mensajes: Mensaje | any = [];
  @Input() abierto: boolean = false;

  constructor(
    private authServicio: AuthService,
    private chatServicio: ChatsService
  ) {}

  ngOnInit(): void {
    this.authServicio.usuario$.subscribe((usuario: Usuario) => {
      if (usuario) this.user = usuario;
    });

    this.chatServicio.TraerChats().subscribe((mensajes) => {
      this.mensajes = mensajes;
      setTimeout(()=>{
        this.scrollToTheLastElementByClassName();
      },300);
    });
  }

  enviarMensaje() {
    if (this.mensajeAEnviar.trim() != '') {
      const mensaje: Mensaje = {
        emisor: this.user,
        mensaje: this.mensajeAEnviar,
        fecha: this.formatearFecha(new Date()),
      };

      this.chatServicio.GuardarChats(mensaje);
      this.mensajeAEnviar = '';
      this.scrollToTheLastElementByClassName();
    }
  }

  private formatearFecha(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hora = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const seg = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hora}:${min}:${seg}`;
  }

  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('chats');
    let ultimoMensaje: any = elements[elements.length - 1];
    let posicionTop = ultimoMensaje.offsetTop;
   
    document.getElementById('myCard').scrollTop = posicionTop;
  }

}
