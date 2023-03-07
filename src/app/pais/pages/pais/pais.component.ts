import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Pais } from '../../interfaces/paisesResponse.interface';
@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styles: [`
  li {
    cursor: pointer;
  }`
  ]
})
export class PaisComponent {

  paises: Pais[] = [];
  paisesSuggest: Pais[] = [];
  termino: string = '';
  haveError: boolean = false;
  showSuggest: boolean = false;
  loader: boolean = false;
  constructor(private _paisService: PaisService) { }

  buscar(termino: string) {
    this.termino = termino;
    this.haveError = false;
    this.paisesSuggest = [];
    this.showSuggest = false;


    if (this.termino.length === 0) {
      return;
    }
    this.loader = true;

    this._paisService.buscarPais(this.termino)
      .subscribe({
        next: paises => {
          this.paises = paises
          this.loader = false;

        },
        error: e => {
          this.haveError = true;
          this.paises = [];

        }
      })
  }

  suggest(e: string) {
    console.log(e);
    if (e.length > 0) {
      this.showSuggest = true;
    } else {
      this.showSuggest = false;
    }
    this.haveError = false;
    this.termino = e;
    console.log(this.termino);

    this._paisService.buscarPais(e)
      .subscribe({
        next: pais => { this.paisesSuggest = pais.slice(0, 4) },
        error: e => this.paisesSuggest = []
      })

  }
}
