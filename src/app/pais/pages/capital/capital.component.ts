import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/paisesResponse.interface';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styles: [
  ]
})
export class CapitalComponent  {

  paises: Pais[] = [];
  termino: string = '';
  haveError: boolean = false;
  constructor(private _paisService: PaisService) { }

  buscar(termino: string) {
    this.termino = termino;
    this.haveError = false;

    if (this.termino.length === 0) {
      return;
    }

    this._paisService.buscarCapital(this.termino)
      .subscribe({
        next: paises => {
          this.paises = paises
        },
        error: e => {
          this.haveError = true;
          this.paises = [];

        }
      })
  }

}
