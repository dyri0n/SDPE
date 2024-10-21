export interface Asignatura {
    id: number;
    nombre: string;
    codigo: string;
    semestre: number;
    previas: number[]; // necesito los id de las asignaturas que son previas y las que tributa para identificarlas y mostrarlas en el fluxograma
    tributa: number[];
  }