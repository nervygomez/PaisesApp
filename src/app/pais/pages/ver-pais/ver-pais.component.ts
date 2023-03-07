import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
import { Pais } from '../../interfaces/paisesResponse.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Pais;
  constructor(
    private activateRoute: ActivatedRoute,
    private _paisService: PaisService) { }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(switchMap(({ code }) => this._paisService.paisByCode(code)),
      tap(console.log))
      .subscribe(paises => this.pais = paises[0])
  }

}
