import { Injectable } from '@angular/core';
import { PromedioDiagnostico } from '../models/diagnosticos.dto';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Asignatura } from '../models/asignaturas.dto';
import { AsignaturaSola } from '../models/asignaturaSola.dto';
import { AsignaturaDetalleDTO } from '../models/asignatura.dto';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticosService {
  constructor(private http: HttpClient) {}

  public apiUrl = 'http://localhost:3000/asignaturas';
  public asignaturasUrl = 'http://localhost:3000/planes-de-estudio';

  public asignatura: string = 'Liderazgo y Colaboración Pedagógica'; //de prueba noma

  public obtenerPromedios(codigoAsignatura: string): Observable<PromedioDiagnostico[]> {
    return this.http.get<PromedioDiagnostico[]>(this.apiUrl + '/promedios/general/' + codigoAsignatura)
  }

  public obtenerAsignaturas(idPlan: number): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.asignaturasUrl + '/' + idPlan + '/asignaturas')
  }

  public obtenerNombreAsignatura(codigoAsignatura: string): Observable<AsignaturaDetalleDTO> {
    return this.http.get<AsignaturaDetalleDTO>(this.apiUrl + '/' + codigoAsignatura)
  }

  public obtenerNombreAsignaturaNuevo(
codigoAsignatura: string
  ): Observable<AsignaturaDetalleDTO> {
    return this.http.get<AsignaturaDetalleDTO>(this.apiUrl + '/' + codigoAsignatura);
  }
}
