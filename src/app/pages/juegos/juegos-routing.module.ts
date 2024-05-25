import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { HomeJuegosComponent } from './home-juegos/home-juegos.component';

const routes: Routes = [
  { path: '', component: HomeJuegosComponent},
  { path: 'ahorcado', component:  AhorcadoComponent},
  { path: 'mayor-menor', component:  MayorMenorComponent},
  { path: 'preguntados', component: PreguntadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosRoutingModule {}
