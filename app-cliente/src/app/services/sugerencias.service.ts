import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {

  constructor(
    private http: HttpClient
  ) { }

  sugerirPalabra(word: string) {
    return this.http.get<string>(`${ baseUrl }/sugerir/`, {
      params: { word }
    });
  }

}
