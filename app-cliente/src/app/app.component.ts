import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    const words = event.split(' ');


    this.suggested_words = []
    if (this.wordForm.valid) {
      this.sugerenciasService.sugerirPalabra(words[words.length - 1]).subscribe(suggested_words => {
        if (suggested_words) {
          this.suggested_words = suggested_words;
        } /* else {
           const newwords: NewWord = {
            word: words[words.length - 2],
            new_word: words[words.length - 1]
          }

          console.log(newwords);

          this.sugerenciasService.agregarNuevaPalabra(newwords).subscribe(new_suggested_words => {
            if (new_suggested_words) {
              this.suggested_words = suggested_words;
            }
          })
        } */
      })

    }
  }

  addWordToInput(newWord: string) {
    this.wordForm.controls['word'].setValue(this.wordForm.controls['word'].value + ' ' + newWord)
  }

}
