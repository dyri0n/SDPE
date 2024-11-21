import { Injectable } from '@angular/core';
import { InfoPracticaDTO } from '../models/practica';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PracticasService {
  practicas: InfoPracticaDTO[] = [];
  constructor() {}

  public obtenerPracticas(): InfoPracticaDTO[] {
    return this.practicas;
  }
  
  public obtenerAlumno(tituloPractica: string): Observable<any> {
    const alumnoPrueba = {id: 1, nombreCompleto: 'Gilberto Manuel Natanael Arias Ossandón', cohorte: '2021', promedio: 6.7, imagen: 'path/to/default-avatar.png'}
    return of(alumnoPrueba)
  }
}
