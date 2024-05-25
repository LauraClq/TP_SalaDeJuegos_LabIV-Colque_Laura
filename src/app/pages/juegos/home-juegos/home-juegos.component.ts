import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-juegos',
  templateUrl: './home-juegos.component.html',
  styleUrl: './home-juegos.component.scss',
})
export class HomeJuegosComponent {
  // itemActive = 0;
  // refreshInterval: any;

  // juegos = [
  //   {
  //     id: 0,
  //     nombre: 'Ahorcado',
  //     descripcion: 'Descripcion del ahorcado',
  //     imagen: '../../../../assets/img1.png',
  //   },
  //   {
  //     id: 1,
  //     nombre: 'Otro Juego',
  //     descripcion: 'Descripcion de otro juego',
  //     imagen: '../../../../assets/img2.jpg',
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Mayor o Menor',
  //     descripcion: 'Descripcion del Mayor o Menor',
  //     imagen: '../../../../assets/img3.jpg',
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Preguntados',
  //     descripcion: 'Descripcion del Preguntados',
  //     imagen: '../../../../assets/img4.jpg',
  //   },
  //   {
  //     id: 4,
  //     nombre: 'Juego de vida',
  //     descripcion: 'Descripcion del Juego de vida',
  //     imagen: '../../../../assets/img5.jpg',
  //   },
  // ];

  // thumbnails = [
  //   { src: '../../../../assets/img1.png', title: 'Ahorcado' },
  //   { src: '../../../../assets/img2.jpg', title: 'Otro Juego' },
  //   { src: '../../../../assets/img3.jpg', title: 'Mayor o Menor' },
  //   { src: '../../../../assets/img4.jpg', title: 'Preguntados' },
  //   { src: '../../../../assets/img5.jpg', title: 'Juego de vida' },
  // ];

  // ngOnInit(): void {
  //   this.refreshInterval = setInterval(() => {
  //     this.nextItem();
  //   }, 5000);
  // }

  // nextItem() {
  //   this.itemActive = (this.itemActive + 1) % this.juegos.length;
  //   this.resetInterval();
  // }

  // prevItem() {
  //   this.itemActive =
  //     (this.itemActive - 1 + this.juegos.length) % this.juegos.length;
  //   this.resetInterval();
  // }

  // selectItem(index: number) {
  //   this.itemActive = index;
  //   this.resetInterval();
  // }

  // getBackgroundImage(): string {
  //   return `url(${this.juegos[this.itemActive].imagen})`;
  // }

  // resetInterval() {
  //   clearInterval(this.refreshInterval);
  //   this.refreshInterval = setInterval(() => {
  //     this.nextItem();
  //   }, 5000);
  // }

  // ngOnDestroy(): void {
  //   clearInterval(this.refreshInterval);
  // }
}
