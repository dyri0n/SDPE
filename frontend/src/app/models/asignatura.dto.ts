export interface AsignaturaFluxograma {
    idAsignatura: number;
    idPlan: number;
    areaFormacion: string;
    asignatura: {
        id: number;
        codigo: string;
        nombre: string;
        descripcion: string;
        linkSyllabus: string;
        unidad: string;
    };
    caracter: string;
    posicion: number;
    semestre: number;
    esRequeridaEn: {
        idAsignaturaTributada: number;
    }[];
    esTributadaEn: {
        idAsignaturaRequerida: number;
    }[];
}

export interface PromedioDTO {
    agnio: number;
    promedio: number;
}
  
export interface AprobacionDTO {
    agnio: number;
    aprobacion: number;
}
  
export interface CohorteDTO {
    agnio: number;
    agnioIngreso: number;
    tipoIngreso: string;
    promedio: number;
}
  
export interface AsignaturaCortePracticoDTO {
    idAsignatura: number;
    posicion: number;
    codigo: string;
}

export interface CohorteAprobacionDTO {
    agnio: number;
    cohorte: number;
    tipoIngreso: string;
    aprobacion: number;
}

export interface TendenciasCortePracticoDTO {
    asignatura: AsignaturaCortePracticoDTO;
    promedios: {
      general: PromedioDTO[];
      ingresoRegular: PromedioDTO[];
      ingresoProsecucion: PromedioDTO[];
      cohortes: CohorteDTO[];
    };
    aprobaciones: {
      general: AprobacionDTO[];
      ingresoRegular: AprobacionDTO[];
      ingresoProsecucion: AprobacionDTO[];
      cohortes: CohorteAprobacionDTO[];
    };
}

  