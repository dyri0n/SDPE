//bloque promedios
import { Asignatura } from '@prisma/client';

export const ID_INGRESO_REGULAR = 309;
export const ID_INGRESO_PROSECUCION = 325;
export interface PromedioHistoricoGeneralDTO {
  agnio: number;
  promedio: number;
}

export interface PromedioHistoricoPorPlanDTO {
  agnio: number;
  promedio: number;
}

export interface PromedioHistoricoPorCohorteDTO {
  agnio: number;
  cohorte: number;
  plan: string;
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
  plan: string;
  aprobacion: number;
}
//fin bloque aprobacion

export interface DetalleAsignaturaDTO {
  asignaturas: Asignatura[];
  promedios: {
    general: PromedioHistoricoGeneralDTO[];
    promediosPorPlan: PromedioHistoricoPorPlanDTO[][];
    cohortes: PromedioHistoricoPorCohorteDTO[];
  };
  aprobaciones: {
    general: AprobacionHistoricaGeneralDTO[];
    aprobacionesPorPlan: AprobacionHistoricaPorTipoIngresoDTO[][];
    cohortes: AprobacionHistoricaPorCohorteDTO[];
  };
}
