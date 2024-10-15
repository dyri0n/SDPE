export interface Convenio {
  id: number;
  nombre: string;
  centroPractica: string;
  inicio: number;
  modalidad: string;
  imagen: File | string;
}

export interface DetalleConvenio {
  convenio: Convenio;
  practicasRealizadas: number;
  promedioPracticas: number;
  aprobacion: number;
  reprobacion: number;
  linkPdf: File | string;
}

export interface ConvenioTest {
  id: number;
  titulo: string;
  centroPractica: string;
  fechaInicioConvenio: Date;
  fechaFinConvenio: Date;
  validez: boolean;
  documentoConvenio: string;
  urlFoto: string;
  idModalidad: number;
}

export interface DetalleConvenioTest {
  convenio: ConvenioTest;
  nroPracticasRealizadas: number;
  promedioPracticas: number;
  porcentajeAprobacion: number;
  porcentajeReprobacion: number;
}

export interface NuevoConvenio {
  nombre: string;
  centroPractica: string;
  inicio: number;
  modalidad: string;
  imagen: File | string;
  linkPdf: File | string;
}

// imange y link pdf estan como File o string porque en si se guardan files 
// con el componente en el registrar convenio para las pruebas yo solo ocupe strings