import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-frenesi-de-esferas',
  templateUrl: './frenesi-de-esferas.component.html',
  styleUrl: './frenesi-de-esferas.component.scss',
})
export class FrenesiDeEsferasComponent implements OnInit {
  public esferas = Array.from(Array(160).keys()); 
  icons = [
    'icon1',
    'icon2',
    'icon3',
    'icon4',
    'icon5',
    'icon6',
    'icon7'
  ];
  public colorRamdon = 0;
  public tiempo = 20;
  public juegoActivado = false;
  public juegoDesactivado = false;
  public gano = false;
  public reprogramar = 0;
  public esferasCompletas = 0;
  myInteral: any;

  @ViewChildren('esferasRefs') esferasRefs: QueryList<any> | undefined;

  ngOnInit(): void {
    this.reiniciarJuego();
  }

  ngOnDestroy(): void {
    clearInterval(this.myInteral);
  }

  cambioStyles(esfera: any) {
    this.colorRamdon = Math.floor(Math.random() * this.icons.length);
    if (!this.juegoDesactivado) {
      esfera.classList.add(this.icons[this.colorRamdon]);
      this.verificarEstadoJuego();
    }
  }

  activarTiempo() {
    this.juegoActivado = true;
    this.myInteral = setInterval(() => {
      if (this.tiempo > 0) {
        this.tiempo--;
      } else {
        this.juegoDesactivado = true;
        clearInterval(this.myInteral);
      }
    }, 1000);
  }

  verificarEstadoJuego() {
    this.reprogramar = 0;
    this.esferasCompletas = 0;
    this.esferasRefs?.forEach((esfera) => {
      if (
        this.icons.some((icon) => esfera.nativeElement.classList.contains(icon))
      ) {
        this.esferasCompletas++;
      } else {
        this.reprogramar++;
      }
    });

    if (!this.juegoActivado) {
      this.activarTiempo();
    }

    //verifico si copleto en total de las esferas
    if (this.esferasCompletas == this.esferas.length) {
      this.gano = true;
      this.juegoDesactivado = true;
    }
  }

  reiniciarJuego() {
    this.juegoActivado = false;
    this.juegoDesactivado = false;
    this.tiempo = 20;
    this.gano = false;
    this.reprogramar = 0;
    this.esferasCompletas = 0;
    this.esferasRefs?.forEach((dot) => {
      this.icons.forEach((icon) => dot.nativeElement.classList.remove(icon));
    });
  }
}
