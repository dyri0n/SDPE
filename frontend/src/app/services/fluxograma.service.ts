import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fluxograma } from '../models/Fluxograma.model';
import { DetalleFluxograma } from '../models/detalleFluxograma.dto';
import { Asignatura } from '../models/asignaturas.dto';


@Injectable({
  providedIn: 'root'
})
export class FluxogramaService {
  private apiUrl= ''

  constructor(/*private http: HttpClient*/) { }

  public obtenerFluxogramas(): Observable<Fluxograma[]>{
    const fluxogramas: Fluxograma[] = [{id:0,planEstudio: 'Ingeniería en Computación', codigo: 'IC-2024'},
                                        {id:1,planEstudio: 'Ingeniería Industrial', codigo: 'II-2023'}]
    return of(fluxogramas)
  }

  asignaturas: Asignatura[] = [
    // Semestre 1
    { id: 1, nombre: 'Matemáticas I', codigo: 'MAT101', semestre: 1, previas: [], tributa: [2, 3] },
    { id: 2, nombre: 'Fundamentos de Programación', codigo: 'PROG101', semestre: 1, previas: [], tributa: [4] },
    { id: 3, nombre: 'Introducción a la Computación', codigo: 'COMP101', semestre: 1, previas: [], tributa: [5] },
  
    // Semestre 2
    { id: 4, nombre: 'Matemáticas II', codigo: 'MAT102', semestre: 2, previas: [1], tributa: [6] },
    { id: 5, nombre: 'Programación Avanzada', codigo: 'PROG102', semestre: 2, previas: [2], tributa: [7] },
    { id: 6, nombre: 'Estructuras de Datos', codigo: 'ED101', semestre: 2, previas: [2], tributa: [8] },
  
    // Semestre 3
    { id: 7, nombre: 'Matemáticas III', codigo: 'MAT103', semestre: 3, previas: [4], tributa: [9] },
    { id: 8, nombre: 'Bases de Datos', codigo: 'BD101', semestre: 3, previas: [5], tributa: [10] },
    { id: 9, nombre: 'Sistemas Operativos', codigo: 'SO101', semestre: 3, previas: [6], tributa: [11] },
  
    // Semestre 4
    { id: 10, nombre: 'Matemáticas IV', codigo: 'MAT104', semestre: 4, previas: [7], tributa: [12] },
    { id: 11, nombre: 'Algoritmos y Complejidad', codigo: 'AC101', semestre: 4, previas: [6], tributa: [13] },
    { id: 12, nombre: 'Redes de Computadoras', codigo: 'RC101', semestre: 4, previas: [9], tributa: [14] },
  
    // Semestre 5
    { id: 13, nombre: 'Matemáticas V', codigo: 'MAT105', semestre: 5, previas: [10], tributa: [15] },
    { id: 14, nombre: 'Inteligencia Artificial', codigo: 'IA101', semestre: 5, previas: [11], tributa: [16] },
    { id: 15, nombre: 'Desarrollo de Aplicaciones Web', codigo: 'DAW101', semestre: 5, previas: [8], tributa: [17] },
  
    // Semestre 6
    { id: 16, nombre: 'Matemáticas VI', codigo: 'MAT106', semestre: 6, previas: [13], tributa: [18] },
    { id: 17, nombre: 'Seguridad Informática', codigo: 'SI101', semestre: 6, previas: [12], tributa: [19] },
    { id: 18, nombre: 'Ingeniería de Software', codigo: 'IS101', semestre: 6, previas: [14], tributa: [20] },
  
    // Semestre 7
    { id: 19, nombre: 'Matemáticas VII', codigo: 'MAT107', semestre: 7, previas: [16], tributa: [21] },
    { id: 20, nombre: 'Computación Gráfica', codigo: 'CG101', semestre: 7, previas: [17], tributa: [22] },
    { id: 21, nombre: 'Sistemas Distribuidos', codigo: 'SD101', semestre: 7, previas: [18], tributa: [23] },
  
    // Semestre 8
    { id: 22, nombre: 'Matemáticas VIII', codigo: 'MAT108', semestre: 8, previas: [19], tributa: [24] },
    { id: 23, nombre: 'Aprendizaje Automático', codigo: 'AA101', semestre: 8, previas: [20], tributa: [25] },
    { id: 24, nombre: 'Desarrollo de Juegos', codigo: 'DJ101', semestre: 8, previas: [21], tributa: [26] },
  
    // Semestre 9
    { id: 25, nombre: 'Matemáticas IX', codigo: 'MAT109', semestre: 9, previas: [22], tributa: [27] },
    { id: 26, nombre: 'Computación en la Nube', codigo: 'CN101', semestre: 9, previas: [23], tributa: [28] },
    { id: 27, nombre: 'Visión por Computadora', codigo: 'VC101', semestre: 9, previas: [24], tributa: [29] },
  
    // Semestre 10
    { id: 28, nombre: 'Matemáticas X', codigo: 'MAT110', semestre: 10, previas: [25], tributa: [] },
    { id: 29, nombre: 'Sistemas Inteligentes', codigo: 'SI102', semestre: 10, previas: [26], tributa: [] },
    { id: 30, nombre: 'Proyecto de Fin de Carrera', codigo: 'PFC101', semestre: 10, previas: [27], tributa: [] },
  ];
  
  detalleFluxograma: DetalleFluxograma = {
    id: 1,
    planEstudio: "Pedagogia en educacion diferencial",
    codigo: "P-2018-v1",
    semestres: 10,
    asignaturas: this.asignaturas
  }

  public obtenerDetalleFluxograma(): Observable<DetalleFluxograma>{
    return of(this.detalleFluxograma)
  }  
}
