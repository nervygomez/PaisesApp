import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Pais } from '../interfaces/paisesResponse.interface'
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  get params() {
    return new HttpParams().set('fields', 'flags,capital,name,population,cca2')
  }

  buscarPais(name: string): Observable<Pais[]> {
    const url = `${this.baseUrl}/name/${name}`;
    return this.http.get<Pais[]>(url, {params: this.params})
    .pipe(tap(console.log))
  }

  buscarRegion(name: string): Observable<Pais[]> {
    const url = `${this.baseUrl}/region/${name}`;
    return this.http.get<Pais[]>(url, {params: this.params})
  }

  buscarCapital(name: string): Observable<Pais[]> {
    const url = `${this.baseUrl}/capital/${name}`;
    return this.http.get<Pais[]>(url, {params: this.params})
  }

  paisByCode(code: string): Observable<Pais[]> {
    const url = `${this.baseUrl}/alpha/${code}`
    return this.http.get<Pais[]>(url)
      // .pipe(map(paises => {
      //   if (paises.length === 0) {
      //     return {}
      //   }
      //   return paises[0]
      // }))
  }
}
