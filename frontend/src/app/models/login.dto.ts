export interface LoginUsuario {
  username: string;
  password: string;
}

export interface RespuestaLogin {
  success: boolean;
  message?: string;
  access_token?: string;
}

export const enum Roles {
  JefaCarrera = 'JefaCarrera',
  Docente = 'Docente',
  Secretaria = 'Secretaria',
}

export interface DecodedJWT {
  rol: string;
  username: string;
}
