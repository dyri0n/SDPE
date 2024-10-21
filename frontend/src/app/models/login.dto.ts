export interface LoginUsuario {
    usuario: string,
    contrasena: string,
}

export interface RespuestaLogin{ 
    success: boolean; 
    message?: string 
}