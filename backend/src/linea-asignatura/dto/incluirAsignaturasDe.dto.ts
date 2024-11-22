export interface AsignaturaDeLinea {
  idAsignatura: number;
  codigo: string;
  nombre: string;
  areaFormacion: string;
}
export interface LineaConAsignaturas {
  titulo: string;
  asignaturas: AsignaturaDeLinea[];
}
