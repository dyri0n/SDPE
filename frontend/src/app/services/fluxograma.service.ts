import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fluxograma } from '../models/Fluxograma.model';
import { HttpClient } from '@angular/common/http';
import { AsignaturaFluxograma } from '../models/asignatura.dto';

@Injectable({
  providedIn: 'root',
})
export class FluxogramaService {
  private apiUrl = 'http://localhost:3000/planes-de-estudio';

  constructor(private http: HttpClient) {}

  //Esta funcion obtiene todos los fluxogramas guardados en la base de datos con el formato "Fluxograma"
  /*
  Fluxograma tiene:
  -idPlan: id para identificar al plan
  -codigo: codigo con el cual se guarda el plan
  -titulo: titulo del plan
  -agnio: año del plan
  -fechaInstauracion: fecha exacta de creacion del plan
  */
  public obtenerFluxogramas(): Observable<Fluxograma[]> {
    return this.http.get<Fluxograma[]>(this.apiUrl);
  }

  public obtenerFluxogramaPorID(id: number): Observable<Fluxograma> {
    return this.http.get<Fluxograma>(`${this.apiUrl}/${id}`);
  }

  public obtenerDetalleFluxograma(idFluxograma: number): Observable<AsignaturaFluxograma[]> {
    return this.http.get<AsignaturaFluxograma[]>(this.apiUrl + '/' + idFluxograma + '/fluxograma')
  }
}
