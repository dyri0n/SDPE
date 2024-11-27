import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaAsignatura } from '../models/listaAsignatura.dto';
import { TendenciasCortePracticoDTO } from '../models/asignatura.dto';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiUrl= 'http://localhost:3000/asignaturas'

  constructor(private http: HttpClient) { }

  public obtenerAsignaturas(): Observable<ListaAsignatura[]>{
    return this.http.get<ListaAsignatura[]>(this.apiUrl)
  }

  public obtenerDetalleAsignatura(idAsignatura: number): Observable<TendenciasCortePracticoDTO>{
    return this.http.get<TendenciasCortePracticoDTO>(this.apiUrl + '/' + idAsignatura + '/detalle')
  }
}
