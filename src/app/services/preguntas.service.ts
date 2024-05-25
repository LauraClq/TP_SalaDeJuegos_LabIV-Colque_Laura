import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  constructor(private http: HttpClient) {}

  private image: string = 'https://hp-api.onrender.com/api/characters';
  obtenerPreguntas() {
    return this.http.get(this.image);
  }
}
