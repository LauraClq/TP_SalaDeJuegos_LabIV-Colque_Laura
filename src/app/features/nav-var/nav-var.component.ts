import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from 'src/app/auth/model/Usuario.model';
import { AuthService } from 'src/app/auth/servicios/auth.service';


@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.scss'],
})
export class NavVarComponent {
  public user: Usuario | null = null;
  chatVisible = false;
  @Output() ActivarChat = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }

  cerrarSesion() {
    this.user = null;
    this.authService.cerrarSesion();
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
    this.ActivarChat.emit(this.chatVisible);
  }
}
