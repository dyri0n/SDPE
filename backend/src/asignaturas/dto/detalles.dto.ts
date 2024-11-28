import { AsignaturaListadaDTO } from './listar.dto';

export const ID_INGRESO_REGULAR = 309;
export const ID_INGRESO_PROSECUCION = 325;

//bloque promedios
export interface PromedioHistoricoGeneralDTO {
  agnio: number;
  promedio: number;
}

export interface PromedioHistoricoPorPlanDTO {
  codigoPlan: number;
  plan: string;
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

export interface AprobacionHistoricaPorPlanDTO {
  codigoPlan: number;
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
  asignaturas: AsignaturaListadaDTO;
  promedios: {
    general: PromedioHistoricoGeneralDTO[];
    promediosPorPlan: PromedioHistoricoPorPlanDTO[];
    cohortes: PromedioHistoricoPorCohorteDTO[];
  };
  aprobaciones: {
    general: AprobacionHistoricaGeneralDTO[];
    aprobacionesPorPlan: AprobacionHistoricaPorPlanDTO[];
    cohortes: AprobacionHistoricaPorCohorteDTO[];
  };
}
