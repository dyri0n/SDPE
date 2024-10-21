import { Injectable } from '@angular/core';
import { Semestre } from '../models/semestre';

@Injectable({
  providedIn: 'root',
})
export class SemestreService {
  semestres: Semestre[] = [];

  constructor() {}

  public obtenerSemestres() {
    return this.semestres;
  }
}
