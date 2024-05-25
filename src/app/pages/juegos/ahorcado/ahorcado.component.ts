import { Component, OnInit } from '@angular/core';
import { SwalService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss',
})
export class AhorcadoComponent implements OnInit{
  
  constructor(private sweetServico: SwalService) {}

  public letras: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  public letrasSeleccionadas: string[] = [];
  public palabraAdivinar: string[] = ['LAGUNA', 'PELOTA', 'GATO', 'PERRO', 'NIEVE', 'CHOCOLATE', 'DORMIR', 'BARILOCHE', 'PATAGONIA', 'DRAGON', 'TIRAMISU'];
  public intentos: number = 6;
  public palabra: string = '';
  public palabraSecreta: string[] = [];
  public juegoActivo: boolean = true;
  
  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.palabra = this.palabraAdivinar[Math.floor(Math.random() * this.palabraAdivinar.length)];
    this.palabraSecreta = Array(this.palabra.length).fill('_');
    this.letrasSeleccionadas = [];
    this.intentos = 6;
    this.juegoActivo = true;
  }

  adivinarPalabra(letra: string) {
    if (this.letrasSeleccionadas.includes(letra)) {
      return; // Ignorar letras ya usadas
    }

    this.letrasSeleccionadas.push(letra);

    if (this.palabra.indexOf(letra) === -1) {
      this.intentos--;
    } else {
      this.actualizarPalabraSecreta(letra);
    }

    if (this.intentos === 0) {
      this.sweetServico.crearSwal(
        '¡Has perdido! La palabra secreta era: ' + this.palabra,
        'error',
        1500
      );
      this.juegoActivo = false;
    } else if (!this.palabraSecreta.includes('_')) {
      this.sweetServico.crearSwal(
        '¡Has ganado! La palabra secreta era: ' + this.palabra,
        'success',
        1500
      );
      this.juegoActivo = false;
    }
  }

  private actualizarPalabraSecreta(letraSeleccionada: string) {
    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra[i] === letraSeleccionada) {
        this.palabraSecreta[i] = letraSeleccionada;
      }
    }
  }

  mostrarLetrasUsadas(letra: string): boolean {
    return this.letrasSeleccionadas.includes(letra);
  }
}

