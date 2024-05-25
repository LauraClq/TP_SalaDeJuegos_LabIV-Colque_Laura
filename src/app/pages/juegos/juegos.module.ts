import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { RouterModule } from '@angular/router';
import { JuegosRoutingModule } from './juegos-routing.module';
import { HomeJuegosComponent } from './home-juegos/home-juegos.component';



@NgModule({
  declarations: [
    HomeJuegosComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
