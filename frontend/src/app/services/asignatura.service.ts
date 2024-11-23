import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListaAsignatura } from '../models/listaAsignatura.dto';
import { AsignaturaLinea, Linea } from '../models/lineaAsignatura.dto';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiUrl= 'http://localhost:3000/asignaturas'

  constructor(private http: HttpClient) { }

  public obtenerAsignaturas(): Observable<ListaAsignatura[]>{
    return this.http.get<ListaAsignatura[]>(this.apiUrl)
  }

  asignaturas: AsignaturaLinea[] = [
    
    { id: 2, nombre: 'Educación Inclusiva y su Contexto' },
    { id: 3, nombre: 'Política y Marco Jurídico' },
    { id: 4, nombre: 'Salud Alimentaria' },
    { id: 5, nombre: 'Enfoque Sistémico y Psicopedagógico' },
  ];

  lineas: Linea[] = [
    { id: 1, nombre: 'Línea de Corte Práctica', asignaturas: [{ id: 1, nombre: 'Expresión Oral y Escrita II' },] },
    { id: 2, nombre: 'Línea de Licenciatura', asignaturas: [] },
  ];

  public obtenerListadoAsignaturas(): Observable<AsignaturaLinea[]> {
    // this.http.get<AsignturaLinea[]>(`${this.apiUrl}/asignaturasLinea`);
    return of(this.asignaturas)
  }

  public obtenerLineas(): Observable<Linea[]> {
    // this.http.get<Linea[]>(`${this.apiUrl}/lineas`);
    return of(this.lineas)
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
