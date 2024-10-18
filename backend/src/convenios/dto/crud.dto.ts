import { Convenio } from '@prisma/client';

export interface UpdateConvenioDTO {
  titulo?: string;
  centroPractica?: string;
  fechaInicioConvenio?: Date;
  fechaFinConvenio?: Date;
  documentoConvenio?: string;
  urlFoto?: string;
  idModalidad?: number;
}
export interface CreateConvenioDTO {
  titulo: string;
  centroPractica: string;
  fechaInicioConvenio: Date;
  fechaFinConvenio?: Date;
  documentoConvenio: string;
  urlFoto: string;
  idModalidad: number;
}
