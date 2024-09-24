export interface resultadoPorTemas {
    nombreAlumno: string;
    programa: string;
    puntaje: number;
    porcentajeTemas: number[]
  }

export interface resultadoPorEstandares {
    nombreAlumno: string;
    programa: string;
    puntaje: number;
    porcentajeEstandares: number[]
}

export interface resultadoPorPA {
  nombreAlumno: string;
  programa: string;
  PA_SP: string
  PA_CE: string
}