export interface AsignaturaLinea {
    id: number;
    nombre: string;
  }

export interface Linea {
    id?: number;
    nombre: string;
    asignaturas: AsignaturaLinea[];
  }