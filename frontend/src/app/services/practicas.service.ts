import { Injectable } from '@angular/core';
import { InfoPracticaDTO } from '../models/practica';

@Injectable({
  providedIn: 'root',
})
export class PracticasService {
  practicas: InfoPracticaDTO[] = [];
  constructor() {}

  public obtenerPracticas(): InfoPracticaDTO[] {
    return this.practicas;
  }
}
