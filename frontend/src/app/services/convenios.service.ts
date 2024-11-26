import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActualizarConvenio, Convenio, Convenios, CreateConvenioDTO, DetalleConvenio} from '../models/convenios.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConveniosService {
  constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/convenios';

  public obtenerConvenios(): Observable<Convenios>{
    return this.http.get<Convenios>(this.apiUrl + "/")
  }

  public obtenerDetalleConvenios(idConvenio: number): Observable<DetalleConvenio>{
    return this.http.get<DetalleConvenio>(this.apiUrl + "/" + idConvenio)
  }

  public actualizarConvenio(idConvenio: number, datos: ActualizarConvenio): Observable<Convenio>{
    return this.http.patch<Convenio>(this.apiUrl + "/" + idConvenio, datos)
  }

  public eliminarConvenio(idConvenio: number): Observable<any>{
    return this.http.delete(this.apiUrl + "/" + idConvenio)
  }

  public nuevoConvenio(convenioTest:CreateConvenioDTO): Observable<CreateConvenioDTO>{
    console.log(convenioTest)
    return this.http.post<CreateConvenioDTO>(this.apiUrl, convenioTest)
  }
}
