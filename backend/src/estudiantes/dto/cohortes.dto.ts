export interface InfoCohorteEstudianteDTO {
  nombre_completo: string;
  rut: string;
  agnio_cohorte: number;
}

export interface ListarPorCohorteDTO {
  cohorte: number;
  estudiantes: InfoCohorteEstudianteDTO[];
}
