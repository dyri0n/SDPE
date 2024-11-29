import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaAsignatura } from '../models/listaAsignatura.dto';
import { AsignaturaDetalleDTO, ReporteAsignaturaDTO, TendenciasCortePracticoDTO } from '../models/asignatura.dto';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiUrl= 'http://localhost:3000/asignaturas'

  constructor(private http: HttpClient) { }

  public obtenerAsignaturas(): Observable<ListaAsignatura[]>{
    return this.http.get<ListaAsignatura[]>(this.apiUrl)
  }

  public obtenerAsignaturasNuevo(): Observable<AsignaturaDetalleDTO[]>{
    return this.http.get<AsignaturaDetalleDTO[]>(this.apiUrl)
  }

  public obtenerDetalleAsignatura(idAsignatura: number): Observable<TendenciasCortePracticoDTO>{
    return this.http.get<TendenciasCortePracticoDTO>(this.apiUrl + '/' + idAsignatura + '/detalle')
  }

  public obtenerDetalleAsignaturaNuevo(codigoAsignatura: string): Observable<ReporteAsignaturaDTO>{
    return this.http.get<ReporteAsignaturaDTO>(this.apiUrl + '/' + codigoAsignatura + '/detalle')
  }
}
