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

export interface PracticaEnConvenioDTO {
  nombreCompleto: string;
  tituloPractica: string;
  numeroPractica: number;
  fechaInicio: Date;
  fechaFin: Date;
  notaFinal: number;
}

export interface ListarPracticasPorConvenioDTO {
  tituloConvenio: string;
  practicas: PracticaEnConvenioDTO[];
}