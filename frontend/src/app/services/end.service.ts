import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resultadosEnd } from '../models/resultadosEND.dto';

@Injectable({
  providedIn: 'root'
})
export class EndService {

  constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/ends';

  public nuevoEND(files: FormData){
    // console.log(convenioTest)
    console.log(files.getAll)
    return this.http.post<any>(this.apiUrl, files)
  }

  //CAMBIAR ANY
  public obtenerEND(){
    return this.http.get<resultadosEnd[]>(this.apiUrl + "/documentos")
  }

  public obtenerENDID(idDato:number){
    return this.http.get<resultadosEnd[]>(this.apiUrl + "/documentos/" + idDato)
  }

  
}
