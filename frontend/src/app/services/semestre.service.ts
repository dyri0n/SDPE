import { Injectable } from '@angular/core';
import { Semestre } from '../models/semestre';

@Injectable({
  providedIn: 'root',
})
export class SemestreService {
  semestres: Semestre[] = [
    { numero: 'I' },
    { numero: 'II' },
    { numero: 'III' },
    { numero: 'IV' },
    { numero: 'V' },
    { numero: 'VI' },
    { numero: 'VII' },
    { numero: 'VIII' },
    { numero: 'IX' },
    { numero: 'X' },
  ];

  constructor() {}

  public obtenerSemestres() {
    return this.semestres;
  }
}
