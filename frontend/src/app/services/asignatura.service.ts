import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignatura } from '../models/asignaturas.dto';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiUrl= 'http://localhost:3000/asignaturas'

  constructor(private http: HttpClient) { }

  public obtenerAsignaturas(): Observable<Asignatura[]>{
    return this.http.get<Asignatura[]>(this.apiUrl)
  }
}
