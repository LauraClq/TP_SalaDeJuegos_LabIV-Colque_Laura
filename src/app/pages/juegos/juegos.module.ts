import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { RouterModule } from '@angular/router';
import { JuegosRoutingModule } from './juegos-routing.module';
import { HomeJuegosComponent } from './home-juegos/home-juegos.component';
import { FrenesiDeEsferasComponent } from './frenesi-de-esferas/frenesi-de-esferas.component';



@NgModule({
  declarations: [
    HomeJuegosComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    FrenesiDeEsferasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
