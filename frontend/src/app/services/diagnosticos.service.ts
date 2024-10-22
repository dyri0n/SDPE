import { Injectable } from '@angular/core';
import { PromedioDiagnostico } from '../models/diagnosticos.dto';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Asignatura } from '../models/asignaturas.dto';
import { AsignaturaSola } from '../models/asignaturaSola.dto';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticosService {
  constructor(private http: HttpClient) {}

  public apiUrl = 'http://localhost:3000/asignaturas';
  public asignaturasUrl = 'http://localhost:3000/planes-de-estudio';

  public asignatura: string = 'Liderazgo y Colaboración Pedagógica'; //de prueba noma
  public promedios: PromedioDiagnostico[] = [
    { id: 1, año: 2016, promedio: 4.5 },
    { id: 2, año: 2017, promedio: 3.8 },
    { id: 3, año: 2018, promedio: 6.2 },
    { id: 4, año: 2019, promedio: 5.7 },
    { id: 5, año: 2020, promedio: 4.1 },
    { id: 6, año: 2021, promedio: 6.8 },
    { id: 7, año: 2022, promedio: 2.9 },
    { id: 8, año: 2023, promedio: 5.3 },
  ];

  public obtenerPromedios(): Observable<PromedioDiagnostico[]> {
    return of(this.promedios);
  }

  public obtenerAsignaturas(idPlan: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(
      this.asignaturasUrl + '/' + idPlan + '/asignaturas'
    );
  }

  public obtenerNombreAsignatura(
    idAsignatura: number
  ): Observable<AsignaturaSola> {
    return this.http.get<AsignaturaSola>(this.apiUrl + '/' + idAsignatura);
  }
}
