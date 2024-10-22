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

  private url = 'http://localhost:3000/auth'

  public iniciarSesion(usuario: LoginUsuario): Observable<RespuestaLogin> {
    console.log(usuario)
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
      this.router.navigateByUrl('login');
      return true;
    }
    return false;
  }

  public isAuth(): Observable<boolean> {
    if (sessionStorage.getItem('token')) {
      return of(true);
    }
    this.router.navigateByUrl('login');
    return of(false);
  }

  public isLoggedIn(): Observable<boolean> {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('home-stay-list');
      return of(false);
    }
    return of(true);
  }

}
