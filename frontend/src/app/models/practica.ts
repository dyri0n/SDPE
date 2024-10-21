import { Estudiante } from './estudiante';

export interface InfoPracticaDTO {
  titulo: string;
  centroPractica: string;
  nombreModalidad: string;
  notaFinal: number;
  numIntento: number;
}

export class DetallesPracticaDTO {
  estudiante: Estudiante = new Estudiante();
  practicas: InfoPracticaDTO[] = [];
}
