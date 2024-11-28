import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { DecodedJWT } from '../models/login.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private api_url_auth: string = '';
  constructor(private httpClient: HttpClient) {}

  // obtener del sessionStorage
  public tieneRol(roles: Array<string>): boolean {
    const jwtToken = sessionStorage.getItem('token') + '';
    const decoded_token: DecodedJWT = jwtDecode(jwtToken);

    return roles.some((role) => decoded_token.rol == role);
  }
}
