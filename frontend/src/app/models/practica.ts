import { Estudiante } from './estudiante';

export interface InfoPracticaDTO {
  nombrePractica: string;
  convenios: string[];
  modadidades: string[];
  centrosDePractica: string[];
  notaFinal: number;
  posicionRelativa: number;
  numIntento: number;
}

export class DetallesPracticaDTO {
  estudiante: Estudiante = new Estudiante();
  practicas: InfoPracticaDTO[] = [];
}
