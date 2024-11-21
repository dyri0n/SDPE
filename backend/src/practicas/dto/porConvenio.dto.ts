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
