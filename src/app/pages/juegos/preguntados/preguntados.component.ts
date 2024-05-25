import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit {
  
  constructor(private preguntasServicio: PreguntasService){}
  ngOnInit(): void {
    this.preguntasServicio.obtenerPreguntas().subscribe((data:any) =>{
      console.log("Indor:",data);
    })
  }



}
