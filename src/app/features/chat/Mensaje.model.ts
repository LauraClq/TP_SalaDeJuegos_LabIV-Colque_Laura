import { Usuario } from "src/app/auth/model/Usuario.model";

export interface Mensaje {
  emisor: Usuario;
  mensaje: string;
  fecha: string;
}
