import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { UsuariosService } from '../services/usuarios.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const login = inject(LoginService);
  return login.isAuth();
};

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const login = inject(LoginService);
  return login.isLoggedIn();
};

export const hasRoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const servicioUsuario = inject(UsuariosService);
  const servicioRouter = inject(Router);

  const rolesQuePermiteLaVista = route.data['roles'] as Array<string>;

  const tieneRol: boolean = servicioUsuario.tieneRol(rolesQuePermiteLaVista);
  if (tieneRol) {
    return tieneRol;
  } else {
    servicioRouter.navigate(['home']);
    return tieneRol;
  }
};
