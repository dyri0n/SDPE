import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TendenciasCortePracticoDTO } from '../models/asignatura.dto';

@Injectable({
  providedIn: 'root'
})
export class TendenciaService {

  private apiUrl= 'http://localhost:3000/asignaturas/corte-practico/tendencias'
  private resumenAsignaturas = [
    { asignatura: 'Asignatura 1', semestre: 'Semestre I', cohorte: 2018, promedio: 3.6, aprobacion: 40 },
    { asignatura: 'Asignatura 1', semestre: 'Semestre I', cohorte: 2019, promedio: 4.0, aprobacion: 60 },
    { asignatura: 'Asignatura 2', semestre: 'Semestre II', cohorte: 2019, promedio: 4.5, aprobacion: 55 },
    { asignatura: 'Asignatura 3', semestre: 'Semestre III', cohorte: 2020, promedio: 5.0, aprobacion: 70 },
    { asignatura: 'Asignatura 1', semestre: 'Semestre I', cohorte: 2020, promedio: 3.8, aprobacion: 50 },
  ];

  constructor(private http: HttpClient) { }

  public obtenerAsignaturas(): Observable<any[]>{
    return of(this.resumenAsignaturas)
  }

  public obtenerAsignaturasTest(): Observable<TendenciasCortePracticoDTO[]>{
    return this.http.get<TendenciasCortePracticoDTO[]>(this.apiUrl + '/')
  }

}
