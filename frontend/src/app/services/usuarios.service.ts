import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private api_url_auth: string = '';
  constructor(private httpClient: HttpClient) {}

  public getRole(jwt: string): Observable<any> {
    return this.httpClient.get(this.api_url_auth);
  }
}
