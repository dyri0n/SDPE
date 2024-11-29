import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fluxograma, FluxogramaNuevo } from '../models/Fluxograma.model';
import { HttpClient } from '@angular/common/http';
import { AsignaturaFluxograma, AsignaturaFluxogramaNuevo } from '../models/asignatura.dto';

@Injectable({
  providedIn: 'root',
})
export class FluxogramaService {
  private apiUrl = 'http://localhost:3000/planes-de-estudio';

  constructor(private http: HttpClient) {}

  public obtenerFluxogramas(): Observable<Fluxograma[]> {
    return this.http.get<Fluxograma[]>(this.apiUrl);
  }

  public obtenerFluxogramasNuevo(): Observable<FluxogramaNuevo[]> {
    return this.http.get<FluxogramaNuevo[]>(this.apiUrl);
  }

  public obtenerFluxogramaPorID(id: number): Observable<Fluxograma> {
    return this.http.get<Fluxograma>(`${this.apiUrl}/${id}`);
  }

  public obtenerFluxogramaPorIDNuevo(id: number): Observable<FluxogramaNuevo> {
    return this.http.get<FluxogramaNuevo>(`${this.apiUrl}/${id}`);
  }


  public obtenerDetalleFluxograma(
    idFluxograma: number
  ): Observable<AsignaturaFluxograma[]> {
    return this.http.get<AsignaturaFluxograma[]>(
      this.apiUrl + '/' + idFluxograma + '/fluxograma'
    );
  }

  public obtenerDetalleFluxogramaNuevo(
    idFluxograma: number
  ): Observable<AsignaturaFluxogramaNuevo[]> {
    return this.http.get<AsignaturaFluxogramaNuevo[]>(
      this.apiUrl + '/' + idFluxograma + '/fluxograma'
    );
  }
}
