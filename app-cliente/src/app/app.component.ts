import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SugerenciasService } from './services/sugerencias.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  wordForm: FormGroup;

  title = 'cliente';

  input_chain!: string;

  suggested_words!: string[];

  constructor(
    private sugerenciasService: SugerenciasService,
    private snack: MatSnackBar
  ) {
    this.wordForm = new FormGroup({
      word: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {

  }

  getPredictWord(event: any): void {

    const words = event.target.value;
    const array = words.split(' ');
    const newword = array[array.length - 2]

    if (this.wordForm.valid) {
      this.sugerenciasService.sugerirPalabra(newword).subscribe(suggested_words => {
        if (!suggested_words && array.length > 2) {
          const preWord = array[array.length - 3];
          this.sugerenciasService.agregarNuevaPalabra({ word: preWord, new_word: newword}).subscribe(resp => {
            this.suggested_words = suggested_words;
            this.snack.open('Se ha detectado una nueva palabra', 'OK', {
              duration: 3000
            })
          });
        } else {
          this.suggested_words = suggested_words;
        }
      })

    }
  }

  addWordToInput(newWord: string) {
    this.wordForm.controls['word'].setValue(this.wordForm.controls['word'].value + newWord)
  }

}
