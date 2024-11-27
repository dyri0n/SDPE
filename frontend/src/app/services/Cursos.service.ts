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

  getCursosPorSemestre(semestre: number): Observable<CursoDTO[]> {
    /*return this.http.get<CursoDTO[]>(this.apiUrl + "/" + semestre)*/
    const cursos: CursoDTO[] = [{id:0,nombre:'a',anio:2024,semestre:2,porcentajeAprobacion:70,porcentajeReprobacion:30},
                                {id:1,nombre:'b',anio:2024,semestre:8,porcentajeAprobacion:69,porcentajeReprobacion:31}]
    return of(cursos)
  }

  public aprobacionPorCurso(idCurso: number): Observable<AprobacionCursoDTO[]>{
    return this.http.get<AprobacionCursoDTO[]>(this.apiUrl + '/' + idCurso)
  }
}
