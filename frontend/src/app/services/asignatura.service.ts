import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListaAsignatura } from '../models/listaAsignatura.dto';
import { AsignaturaLinea, Linea, LineaPlan, LineasAsignaturas } from '../models/lineaAsignatura.dto';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiUrl= 'http://localhost:3000/asignaturas'
  private apiLinea= 'http://localhost:3000/linea-asignatura'

  constructor(private http: HttpClient) { }

  public obtenerAsignaturas(): Observable<ListaAsignatura[]>{
    return this.http.get<ListaAsignatura[]>(this.apiUrl)
  }

  public obtenerListadoAsignaturas(idPlan:Number) {
    return this.http.get<LineasAsignaturas>(`${this.apiLinea}/asignaturas/${idPlan}`);
  }

  public obtenerLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(`${this.apiLinea}`);
  }

  public obtenerLineasPlan(idPlan: number) {
    return this.http.get<LineaPlan>(`${this.apiLinea}/${idPlan}`);
  }

  public agregarAsignaturaLinea(idAsignatura: number, idLinea: Number){
    console.log("si")
    return this.http.get<Linea[]>(`${this.apiUrl}/lineas`);
  }

  public guardarCambios(lineas: Linea[]){
    console.log("lol", lineas)
    return this.http.post<Linea>(`${this.apiUrl}/guardarCambios`, lineas);
  }

}
