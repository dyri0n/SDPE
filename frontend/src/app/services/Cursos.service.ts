import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AprobacionCursoDTO, CursoDTO } from '../models/Curso.dto';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'http://localhost:3000/asignaturas/aprobacion-curso'

  constructor(private http: HttpClient) {}

  //Esta funcion obtiene todos los promedios guardados en la base de datos con el formato "AprobacionCursoDTO"
  /*
  AprobacionCursoDTO tiene:
  -agnio: año en el que se curso el curso (valga la redundancia)
  -cohorte: cohorte que hizo el curso
  -plan: plan al que corresponde el curso
  -aprobacion: porcentaje de aprobacion que obtuvo el cohorte en el curso
  */
  public aprobacionPorCurso(codigoAsignatura: string): Observable<AprobacionCursoDTO[]>{
    return this.http.get<AprobacionCursoDTO[]>(this.apiUrl + '/' + codigoAsignatura)
  }
}
