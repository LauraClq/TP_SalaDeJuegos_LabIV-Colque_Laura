import { Component, OnInit } from '@angular/core';
import { CartasService } from '../../../services/cartas.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss',
})
export class MayorMenorComponent implements OnInit {
  public imagenCartaActual: any;
  public imagenCartaAnteior: any;
  public valorCartaAnterior = -1;
  public valorCartaActual = -1;
  public puntos = 0;
  public mensaje = '';
  public perdio = false;
  public intentos = 4;
  public juegoActivado = true;

  constructor(private cartaServicio: CartasService) {}

  ngOnInit(): void {
    console.log(this.obtenerCartas());
  }

  obtenerCartas() {
    return new Promise((resolve, reject) => {
      this.cartaServicio.obtenerCarta().subscribe((data: any) => {
        this.guardarCarta(data.cards[0]);
        resolve(data);
      });
    });
  }

  guardarCarta(carta: any) {
    this.darValorACarta(carta.value);
    this.imagenCartaActual = carta.image;
  }

  darValorACarta(textoCarta: any) {
    switch (textoCarta) {
      case 'ACE':
        this.valorCartaActual = 1;
        break;
      case 'JACK':
        this.valorCartaActual = 11;
        break;
      case 'QUEEN':
        this.valorCartaActual = 12;
        break;
      case 'KING':
        this.valorCartaActual = 13;
        break;
      default:
        this.valorCartaActual = parseInt(textoCarta);
    }
  }

  compararMayorMenor(cartaActual: number, cartaAnterior: number) {
    if (cartaActual === cartaAnterior) {
      return 'igual';
    }
    return cartaActual > cartaAnterior ? 'mayor' : 'menor';
  }

  elegirSiEsMayorMenor(opcion: string) {
    if (!this.juegoActivado) {
      this.mensaje =
        'Te quedate sin vidas. Tus puntos fueron: ' + this.puntos + '.';
      return;
    }

    this.valorCartaAnterior = this.valorCartaActual;
    this.imagenCartaAnteior = this.imagenCartaActual;

    this.obtenerCartas().then(() => {
      let mayorOmenor = this.compararMayorMenor(
        this.valorCartaActual,
        this.valorCartaAnterior
      );
      if (mayorOmenor === 'igual') {
        this.cartasIguales();
      } else {
        mayorOmenor === opcion ? this.gana() : this.pierde();
      }
    });
  }

  cartasIguales() {
    this.mensaje = 'Son iguales, no se descuenta ni se suma puntos.';
  }

  gana() {
    this.puntos++;
    this.perdio = false;
    this.mensaje = '¡Acertaste! Sumás un punto más.';
  }

  pierde() {
    this.intentos--;
    if (this.intentos <= 0) {
      this.mensaje =
        '¡Juego terminado! Tus puntos fueron: ' + this.puntos + '.';
      this.juegoActivado = false;

      this.puntos = 0;
    } else {
      this.perdio = true;
      this.mensaje =
        'Perdiste la partida. Tus puntos fueron: ' + this.puntos + '.';
    }
  }

  mostrarCartaVieja() {
    return this.imagenCartaAnteior
      ? this.imagenCartaAnteior
      : '../assets/carta-reverso.png'; //se muestra esto automaticanmte
  }

  reinicarJuego() {
    this.intentos = 4;
    this.puntos = 0;
    this.perdio = false;
    this.juegoActivado = true;
    this.mensaje = 'El juego se ha reiniciado. Buen suerta';
    this.imagenCartaAnteior = ''; //si es vacio
    this.obtenerCartas();
  }
}
