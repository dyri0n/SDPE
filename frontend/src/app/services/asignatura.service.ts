import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListaAsignatura } from '../models/listaAsignatura.dto';
import { AsignaturaLinea, Linea, LineaPlan, LineasAsignaturas } from '../models/lineaAsignatura.dto';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiAsignaturas= 'http://localhost:3000/asignaturas'
  private apiLinea= 'http://localhost:3000/lineas-asignaturas'

  constructor(private http: HttpClient) { }

  public obtenerAsignaturas(): Observable<ListaAsignatura[]>{
    return this.http.get<ListaAsignatura[]>(this.apiAsignaturas)
  }

  public agregarAsignaturaLinea(idAsignatura: number, idLinea: Number){
    console.log("si")
    return this.http.get<Linea[]>(`${this.apiAsignaturas}/lineas`);
  }

  public guardarCambios(lineas: Linea[]){
    console.log("lol", lineas)
    return this.http.post<Linea>(`${this.apiAsignaturas}/guardarCambios`, lineas);
  }

  // LINEAS
  public obtenerListadoAsignaturas(idPlan:Number) {
    return this.http.get<LineasAsignaturas>(`${this.apiLinea}/planes/${idPlan}/asignaturas`);
  }

  public obtenerLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(`${this.apiLinea}`);
  }

  public obtenerLineasPlan(idPlan: number) {
    return this.http.get<LineaPlan>(`${this.apiLinea}/planes/${idPlan}`);
  }

}
