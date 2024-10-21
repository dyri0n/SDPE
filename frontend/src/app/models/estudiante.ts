import { InfoPracticaDTO } from './practica';

export class Estudiante {
  nombreCompleto: String = '';
  rut: number = 0;
  agnioIngreso: number = 0;
  plan: number = 0;
}

export class EstudiantePracticas extends Estudiante {
  practicas: InfoPracticaDTO[] = [];
}
