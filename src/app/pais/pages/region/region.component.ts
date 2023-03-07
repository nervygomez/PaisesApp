import { Component } from '@angular/core';
import { Pais } from '../../interfaces/paisesResponse.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styles: [
  ]
})
export class RegionComponent {

  regiones: string[] = ["africa", "americas", "asia", "europe", "oceania"];
  paises: Pais[] = [];
  regionActive: string = ''
  constructor(private _paisService: PaisService) { }

  

  buscar(region: string) {
    if (region === this.regionActive) return;
    this.regionActive = region;
    this.paises = [];
    this._paisService.buscarRegion(region)
    .subscribe(paises => this.paises = paises)
  }

}
