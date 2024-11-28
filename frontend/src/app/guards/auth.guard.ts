import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
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

  const rolesQuePermiteLaVista = route.data['roles'] as Array<string>;

  if (rolesQuePermiteLaVista.length == 0) {
    return true;
  }

  return servicioUsuario.tieneRol(rolesQuePermiteLaVista);
};
