import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewWord } from '../interfaces/new-word.interface';

const baseUrl = environment.api;

@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {

  constructor(
    private http: HttpClient
  ) { }

  sugerirPalabra(word: string) {
    return this.http.get<string[]>(`${baseUrl}/sugerir/`, {
      params: { word }
    });
  }

  agregarNuevaPalabra(newWord: NewWord) {
    return this.http.post<string[]>(`${baseUrl}/agregar/`, {
      word: newWord.word,
      new_word: newWord.new_word
    })
  }

}
