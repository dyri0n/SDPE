import { Injectable } from '@angular/core';
import { Practica } from '../models/practica';

@Injectable({
  providedIn: 'root',
})
export class PracticasService {
  practicas: Practica[] = [
    {
      titulo: 'Titulo 1',
      nombreEstudiante: 'Patricio Chang',
      nombreProfe: 'Miguel Trigo',
      fecha: new Date(),
    } as Practica,

    {
      titulo: 'Titulo 2',
      nombreEstudiante: 'Francisco Pantoja',
      nombreProfe: 'Miguel Trigo',
      fecha: new Date(),
    } as Practica,

    {
      titulo: 'Titulo 3',
      nombreEstudiante: 'Tomas Silva',
      nombreProfe: 'Ibar Ramirez',
      fecha: new Date(),
    } as Practica,

    {
      titulo: 'Titulo 4',
      nombreEstudiante: 'Fabian Orellana',
      nombreProfe: 'Roberto Espinoza',
      fecha: new Date(),
    } as Practica,
  ];

  constructor() {}

  public obtenerPracticas(): Practica[] {
    return this.practicas;
  }
}
