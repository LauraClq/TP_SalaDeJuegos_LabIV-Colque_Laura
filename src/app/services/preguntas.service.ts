import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  constructor(private http: HttpClient) {}

  obtenerPreguntas() {
    return this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes');
  }
}
