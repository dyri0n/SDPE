import { AREA } from '@prisma/client';

export interface AsignaturaListadaDTO {
  tituloPlan: string;
  codigoPlan: number;
  fechaInstauracionPlan: Date;
  codigoAsignatura: string;
  nombreAsignatura: string;
  nombreCortoAsignatura: string;
  semestreRealizacion: number;
  areaFormacion: AREA;
}
