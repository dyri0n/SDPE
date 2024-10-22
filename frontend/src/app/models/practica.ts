import { Estudiante } from './estudiante';

export interface InfoPracticaDTO {
  titulo: string;
  centroPractica: string;
  nombreModalidad: string;
  notaFinal: number;
  posicionRelativa: number;
  numIntento: number;
  tipoPractica: String;
}

export class DetallesPracticaDTO {
  estudiante: Estudiante = new Estudiante();
  practicas: InfoPracticaDTO[] = [];
}
