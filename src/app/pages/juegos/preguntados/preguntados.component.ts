import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { SwalService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss',
})
export class PreguntadosComponent implements OnInit {
  public imagen: any;
  public personaje: any;
  public casa: any;
  public puntos: number = 0;
  public intentos: number = 3; // Número de intentos permitidos
  public juegoActivado: boolean = true;

  constructor(
    private preguntasServicio: PreguntasService,
    private SweetServicio: SwalService
  ) {}
  ngOnInit() {
    this.obtenerPregunta();
  }

  obtenerPregunta() {
    this.preguntasServicio.obtenerPreguntas().subscribe((data: any) => {
      let ramdom = Math.floor(Math.random() * 17);
      this.imagen = data[ramdom].image; //acceso la imagen de mi api
      this.personaje = data[ramdom].name; //accedo el nombre de mi api
      this.casa = data[ramdom].house; //accedo la casa de mi api
      console.log(this.imagen, this.personaje, this.casa);
    });
  }

  verificarRespuesta(respuesta: string) {
    if (respuesta === this.casa) {
      this.SweetServicio.crearSwal('Correcto!', 'success', 1500);
      this.puntos++;
    } else {
      if (this.intentos > 0) {
        this.intentos--; // Disminuir los intentos solo si hay intentos restantes
      }
      this.SweetServicio.crearSwal(
        `La respuesta correcta es: ${this.casa}`,
        'error',
        1500
      );
    }

    if (this.intentos === 0) {
      this.juegoActivado = false; // Si se acabaron los intentos, finalizar el juego
    }
    this.obtenerPregunta();
  }

  reiniciarJuego(): void {
    this.puntos = 0;
    this.intentos = 3; // Reiniciar los intentos
    this.juegoActivado = true;
    this.obtenerPregunta();
  }
}

















  