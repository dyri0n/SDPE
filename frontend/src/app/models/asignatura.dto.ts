export interface AsignaturaFluxograma {
    idAsignatura: number;
    codigo: string;
    nombre: string;
    nombreCorto: string;
    unidad: string;
    caracter: string;
    areaFormacion: string;
    creditos: number;
    tributaciones: any[];
    prerrequisitos: any[];
    posicion: number;
    semestre: number;
    competencias: string[];
    descripcion: string;
    linkSyllabus: string;
    idPlan: number;
    idLinea: number;
  }

export interface PlanDetalleDTO {
    titulo: string;
    codigo: number;
    fechaInstauracion: string;
}

export interface AsignaturaDetalleDTO {
    idAsignatura: number;
    codigoAsignatura: string;
    nombreAsignatura: string;
    nombreCortoAsignatura: string;
    semestreRealizacion: number;
    areaFormacion: string;
    planes: PlanDetalleDTO[];
}

export interface PromedioGeneralDTO {
    agnio: number;
    promedio: number;
}
  
export interface PromedioCohorteDTO {
    agnio: number;
    cohorte: number;
    plan: string;
    promedio: number;
}
  
export interface PromedioPorPlanDTO {
    codigoPlan: number;
    agnio: number;
    promedio: number;
}
  
export interface AprobacionGeneralDTO {
    agnio: number;
    aprobacion: number;
}
  
export interface AprobacionCohorteDTO {
    agnio: number;
    cohorte: number;
    plan: string;
    aprobacion: number;
}
  
export interface AprobacionPorPlanDTO {
    codigoPlan: number;
    agnio: number;
    aprobacion: number;
}

export interface PromediosDTO {
    general: PromedioGeneralDTO[];
    cohortes: PromedioCohorteDTO[];
    promediosPorPlan: PromedioPorPlanDTO[];
}
  
export interface AprobacionesDTO {
    general: AprobacionGeneralDTO[];
    cohortes: AprobacionCohorteDTO[];
    aprobacionesPorPlan: AprobacionPorPlanDTO[];
}
  
export interface ReporteAsignaturaDTO {
    asignaturas: AsignaturaDetalleDTO;
    promedios: PromediosDTO;
    aprobaciones: AprobacionesDTO;
}
  