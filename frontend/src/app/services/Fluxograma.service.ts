import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fluxograma } from '../models/Fluxograma.model';

@Injectable({
  providedIn: 'root'
})
export class FluxogramaService {
  private apiUrl= ''

  constructor(/*private http: HttpClient*/) { }

  public obtenerFluxogramas(): Observable<Fluxograma[]>{
    const fluxogramas: Fluxograma[] = [{id:0,planEstudio: 'Ingeniería en Computación', codigo: 'IC-2024'},
                                        {id:1,planEstudio: 'Ingeniería Industrial', codigo: 'II-2023'}]
    return of(fluxogramas)
  }



}
