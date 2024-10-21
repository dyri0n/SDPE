import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsuario, RespuestaLogin } from '../models/login.dto';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private url = 'http://localhost:3000/login' //poner url pa login

  public iniciarSesion(usuario: LoginUsuario): Observable<RespuestaLogin> {
    return this.http.post<any>(`${this.url}/login`, usuario).pipe(
      map((result) => {
        if (result && result.access_token) {
          sessionStorage.setItem('token', result.access_token);
          return { success: true };
        }
        return { success: false };
      }),
      catchError((error) => {
        console.error('Error durante el inicio de sesion', error);
        let errorMessage = '';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return of({ success: false, message: errorMessage });
      }),
    );
  }

  public logout(): boolean {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      return true;
    }
    this.router.navigateByUrl('/login') //deberian ser el guard el que rediriga a otra vista
    return false;
  }

}
