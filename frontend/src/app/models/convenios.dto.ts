export interface ConvenioLista {
  idConvenio: number;
  imagen: string;
  nombreConvenio: string;
  centroPractica: string;
  inicio: Date;
  nombreModalidad: string;
}

export interface Convenio {
  id: number;
  titulo: string;
  centroPractica: string;
  fechaInicioConvenio: Date;
  fechaFinConvenio: Date;
  validez: boolean;
  documentoConvenio: string;
  urlFoto?: string;
  idModalidad: number;
  Modalidad: Modalidad;
}

export interface DetalleConvenio {
  convenio: Convenio;
  nroPracticasRealizadas: number;
  promedioPracticas: number;
  porcentajeAprobacion: number;
  porcentajeReprobacion: number;
}

export interface Modalidad {
  idModalidad: string;
  nombreModalidad: string;
}

export interface CreateConvenioDTO {
  titulo: string;
  centroPractica: string;
  fechaInicioConvenio: Date;
  fechaFinConvenio?: Date;
  documentoConvenio: string; //titulo del documento
  urlFoto: string;  //titulo foto
  idModalidad: number;
}

export interface Convenios{
  listadoConvenios: ConvenioLista[];
  modalidades: Modalidad[];
}

// imange y link pdf estan como File o string porque en si se guardan files 
// con el componente en el registrar convenio para las pruebas yo solo ocupe strings