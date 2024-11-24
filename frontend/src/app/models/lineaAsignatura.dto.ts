export interface Linea {
  id?: number;
  nombre: string;
  asignaturas: AsignaturaLinea[];
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