import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoAvance } from '../models/alumno-avance';
import { Observable } from 'rxjs';
import { EstudiantePracticas } from '../models/estudiante';
import { DetallesPracticaDTO } from '../models/practica';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  /**
   * Servicio que inyecta los datos correspondiente a los alumnos
   *
   * Es inyectado a la vista avance-estudiante y practicas
   */

  // FIXME: crear una archivo .env para meter las urls
  private api_url_avance = 'http://localhost:3000/estudiantes/1/avance';
  private api_url_practicas = 'http://localhost:3000/practicas/estudiante/1';

  constructor(private httpclient: HttpClient) {}

  /**
   * Funcion  que retorna un objeto AlumnoAvance
   * @param {number} id_estudiante
   * @returns {Observable<AlumnoAvance>}
   *
   */
  public getAvanceEstudiante(id_estudiante: number): Observable<AlumnoAvance> {
    return this.httpclient.get<AlumnoAvance>(this.api_url_avance);
  }

  /**
   * Funcion que obtiene los datos de las practicas realizadas por el estudiante
   * @param {number} id_estudiante
   * @returns {EstudiantePracticas}
   */
  public getPracticasAlumno(
    id_estudiante: number
  ): Observable<DetallesPracticaDTO> {
    return this.httpclient.get<DetallesPracticaDTO>(this.api_url_practicas);
  }
}
