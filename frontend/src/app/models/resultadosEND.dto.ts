export interface ResultadosEnd {
  idDato: number;
  agnoRendicion: Date;
  cohorteAsociado: Date;
  rutaDocumento: string;
  fechaSubida: Date;
}

export interface NuevoEND{
  agnoRendicion: string;
  cohorteAsociado: string;
}