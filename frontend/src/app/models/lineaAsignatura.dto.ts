export interface Linea {
  id?: number;
  nombre: string;
  asignaturas: AsignaturaLinea[];
}
  
export interface LineaActualizar {
  codigoAsignatura: string;
  tituloLineaRelacionada?: string;
}

export interface AsignaturaLinea {
  titulo?: string;
  codigo?: string;
  nombre: string;
  areaFormacion?: string;
  idAsignatura: number;
}

export interface LineasAsignaturas {
  [linea: string]: AsignaturaLinea[];
}

export interface LineaPlan {
  idPlan: number;
  tituloPlan: string;
  lineasAsignatura: {
    idLinea: number;
    titulo: string;
  }[]
}

export interface Lineas{
  idLinea: number,
  titulo: string,
}