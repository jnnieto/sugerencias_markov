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

  newWord!: string;

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

  getPredictWord(): void {
    if (this.wordForm.valid) {
      this.sugerenciasService.sugerirPalabra(this.wordForm.value.word).subscribe( newWord => {
        this.newWord = newWord;
      })
    }
  }

}
