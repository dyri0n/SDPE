export interface LoginUsuario {
    username: string,
    password: string,
}

export interface RespuestaLogin{ 
    success: boolean; 
    message?: string 
}