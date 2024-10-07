//bloque promedios
import { Asignatura } from '@prisma/client';

export const ID_INGRESO_REGULAR = 309;
export const ID_INGRESO_PROSECUCION = 325;
export interface PromedioHistoricoGeneralDTO {
  agnio: number;
  promedio: number;
}

export interface PromedioHistoricoPorTipoIngresoDTO {
  agnio: number;
  promedio: number;
}

export interface PromedioHistoricoPorCohorteDTO {
  agnio: number;
  agnioIngreso: number;
  tipoIngreso: number;
  promedio: number;
}
//fin bloque promedios
//bloque aprobacion
export interface AprobacionHistoricaGeneralDTO {
  agnio: number;
  aprobacion: number;
}
export interface AprobacionHistoricaPorTipoIngresoDTO {
  agnio: number;
  aprobacion: number;
}
export interface AprobacionHistoricaPorCohorteDTO {
  agnio: number;
  cohorte: number;
  tipoIngreso: number;
  aprobacion: number;
}
//fin bloque aprobacion

export interface DetalleAsignaturaDTO {
  asignatura: Asignatura;
  promedios: {
    general: PromedioHistoricoGeneralDTO[];
    ingresoRegular: PromedioHistoricoPorTipoIngresoDTO[];
    ingresoProsecucion: PromedioHistoricoPorTipoIngresoDTO[];
    cohortes: AprobacionHistoricaPorCohorteDTO[];
  };
  aprobaciones: {
    general: AprobacionHistoricaGeneralDTO[];
    ingresoRegular: AprobacionHistoricaPorTipoIngresoDTO[];
    ingresoProsecucion: AprobacionHistoricaPorTipoIngresoDTO[];
    cohortes: AprobacionHistoricaPorCohorteDTO[];
  };
}