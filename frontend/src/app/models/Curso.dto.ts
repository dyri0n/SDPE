export interface CursoDTO {
    id: number;
    nombre: string;
    anio: number;
    semestre: number;
    porcentajeAprobacion: number;
    porcentajeReprobacion: number;
}

export interface AprobacionCursoDTO{
    agnio: number;
    cohorte: number;
    tipoIngreso: string;
    aprobacion: number;
}
  