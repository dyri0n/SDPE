import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaAsignatura } from '../models/listaAsignatura.dto';
import { AsignaturaDetalleDTO, ReporteAsignaturaDTO, TendenciasCortePracticoDTO } from '../models/asignatura.dto';
import { Linea, LineaCambios, LineaPlan, Lineas, LineasAsignaturas } from '../models/lineaAsignatura.dto';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiAsignaturas= 'http://localhost:3000/asignaturas'
  private apiLinea= 'http://localhost:3000/lineas-asignaturas'

  constructor(private http: HttpClient) { }

  // LINEAS 
  public agregarAsignaturaLinea(idPlan: number, asignatura:LineaCambios){
    return this.http.post<Linea>(`${this.apiLinea}/planes/${idPlan}/asignaturas`, asignatura);
  }

  public guardarCambios(idPlan:number, lineas: LineaCambios){
    console.log(lineas)
    return this.http.post<Linea>(`${this.apiLinea}/planes/${idPlan}/asignaturas`, lineas);
  }

  public obtenerListadoAsignaturas(idPlan:Number) {
    return this.http.get<LineasAsignaturas>(`${this.apiLinea}/planes/${idPlan}/asignaturas`);
  }

  public obtenerLineas(): Observable<Lineas[]> {
    return this.http.get<Lineas[]>(`${this.apiLinea}`);
  }

  public eliminarLinea(idPlan: number, idLinea: number){
    console.log('sisi')
    return this.http.delete(`${this.apiLinea}/planes/${idPlan}/lineas/${idLinea}`)
  }

  public obtenerLineasPlan(idPlan: number) {
    return this.http.get<LineaPlan>(`${this.apiLinea}/planes/${idPlan}`);
  }

  // ASIGNATURAS
  public obtenerAsignaturas(): Observable<ListaAsignatura[]>{
    return this.http.get<ListaAsignatura[]>(this.apiAsignaturas)
  }

  public obtenerAsignaturasNuevo(): Observable<AsignaturaDetalleDTO[]>{
    return this.http.get<AsignaturaDetalleDTO[]>(this.apiAsignaturas)
  }

  public obtenerDetalleAsignatura(idAsignatura: number): Observable<TendenciasCortePracticoDTO>{
    return this.http.get<TendenciasCortePracticoDTO>(this.apiAsignaturas + '/' + idAsignatura + '/detalle')
  }

  public obtenerDetalleAsignaturaNuevo(codigoAsignatura: string): Observable<ReporteAsignaturaDTO>{
    return this.http.get<ReporteAsignaturaDTO>(this.apiAsignaturas + '/' + codigoAsignatura + '/detalle')
  }
}
