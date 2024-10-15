import { InfoEstudianteDTO } from '../../estudiantes/dto/avance.dto';

export interface DetallePracticasDTO {
  estudiante: InfoEstudianteDTO;
  practicas: InfoPracticaDTO[];
}
export interface InfoPracticaDTO {
  titulo: string;
  centroPractica: string;
  nombreModalidad: string;
  notaFinal: number;
  numIntento: number;
}
