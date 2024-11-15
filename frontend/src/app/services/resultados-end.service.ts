import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { resultadoPorEstandares, resultadoPorPA, resultadoPorTemas, resultadosEnd } from '../models/resultadosEND.dto';

@Injectable({
  providedIn: 'root'
})
export class ResultadosENDService {

constructor() { }

public listaResultados: resultadosEnd[]=[
  {
    periodo: 2024,
    cohorte: 2020
  },
  {
    periodo: 2023,
    cohorte: 2019
  },
  {
    periodo: 2022,
    cohorte: 2018
  },
  {
    periodo: 2021,
    cohorte: 2017
  },
  {
    periodo: 2020,
    cohorte: 2016
  },
  {
    periodo: 2019,
    cohorte: 2015
  },
  {
    periodo: 2018,
    cohorte: 2014
  },
  {
    periodo: 2017,
    cohorte: 2013
  }
  
]

public resultadosPorTemas: resultadoPorTemas[] = [
    {
      nombreAlumno: "Juan Pérez",
      programa: "Plan regular",
      puntaje: 85,
      porcentajeTemas: [92, 40, 65] // Tema 1, Tema 2, Tema 3
    },
    {
      nombreAlumno: "María González",
      programa: "Prosecución",
      puntaje: 78,
      porcentajeTemas: [40, 55, 60]
    },
    {
      nombreAlumno: "Carlos López",
      programa: "Plan regular",
      puntaje: 92,
      porcentajeTemas: [75, 50, 85]
    },
    {
      nombreAlumno: "Ana Díaz",
      programa: "Prosecución",
      puntaje: 88,
      porcentajeTemas: [86, 80, 79]
    },
    {
      nombreAlumno: "José Ramírez",
      programa: "Plan regular",
      puntaje: 74,
      porcentajeTemas: [87, 76, 92]
    },
    {
      nombreAlumno: "Laura Torres",
      programa: "Prosecución",
      puntaje: 91,
      porcentajeTemas: [22, 38, 55]
    },
    {
      nombreAlumno: "Miguel Hernández",
      programa: "Plan regular",
      puntaje: 81,
      porcentajeTemas: [83, 72, 67]
    },
    {
      nombreAlumno: "Carmen Silva",
      programa: "Prosecución",
      puntaje: 87,
      porcentajeTemas: [84, 55, 69]
    },
    {
      nombreAlumno: "Rodrigo Castro",
      programa: "Plan regular",
      puntaje: 76,
      porcentajeTemas: [30, 45, 73]
    },
    {
      nombreAlumno: "Valeria Morales",
      programa: "Prosecución",
      puntaje: 84,
      porcentajeTemas: [82, 86, 85]
    }
];
  
public resultadosPorEstandares: resultadoPorEstandares[] = [
  {
      nombreAlumno: "Juan Pérez",
      programa: "Plan regular",
      puntaje: 85,
      porcentajeEstandares: [72, 78, 80, 55, 70, 82, 75, 68, 74, 90] // E1 - E10
  },
  {
      nombreAlumno: "María González",
      programa: "Prosecución",
      puntaje: 48,
      porcentajeEstandares: [20, 30, 45, 50, 30, 42, 36, 41, 39, 37]
  },
  {
      nombreAlumno: "Carlos López",
      programa: "Plan regular",
      puntaje: 92,
      porcentajeEstandares: [95, 88, 70, 82, 90, 75, 60, 85, 84, 88]
  },
  {
      nombreAlumno: "Ana Díaz",
      programa: "Prosecución",
      puntaje: 70,
      porcentajeEstandares: [60, 55, 65, 90, 62, 50, 57, 59, 58, 80]
  },
  {
      nombreAlumno: "José Ramírez",
      programa: "Plan regular",
      puntaje: 30,
      porcentajeEstandares: [25, 20, 30, 27, 26, 22, 24, 20, 19, 23]
  },
  {
      nombreAlumno: "Laura Torres",
      programa: "Prosecución",
      puntaje: 81,
      porcentajeEstandares: [75, 72, 88, 80, 95, 70, 76, 74, 79, 77]
  },
  {
      nombreAlumno: "Miguel Hernández",
      programa: "Plan regular",
      puntaje: 56,
      porcentajeEstandares: [45, 50, 35, 42, 52, 38, 30, 44, 39, 41]
  },
  {
      nombreAlumno: "Carmen Silva",
      programa: "Prosecución",
      puntaje: 90,
      porcentajeEstandares: [88, 90, 92, 89, 87, 86, 91, 85, 84, 93]
  },
  {
      nombreAlumno: "Rodrigo Castro",
      programa: "Plan regular",
      puntaje: 65,
      porcentajeEstandares: [60, 58, 63, 57, 62, 59, 61, 54, 52, 51]
  },
  {
      nombreAlumno: "Valeria Morales",
      programa: "Prosecución",
      puntaje: 40,
      porcentajeEstandares: [38, 35, 40, 41, 36, 34, 33, 32, 31, 30]
  }
];

public resultadosPorPA: resultadoPorPA[] = [
  {
    nombreAlumno: "JUAN PÉREZ",
    programa: "PLAN REGULAR",
    PA_SP: "C",
    PA_CE: "D"
  },
  {
    nombreAlumno: "MARÍA GONZÁLEZ",
    programa: "PROSECUCION",
    PA_SP: "B",
    PA_CE: "C"
  },
  {
    nombreAlumno: "CARLOS LÓPEZ",
    programa: "PLAN REGULAR",
    PA_SP: "D",
    PA_CE: "C"
  },
  {
    nombreAlumno: "ANA DÍAZ",
    programa: "PROSECUCION",
    PA_SP: "C",
    PA_CE: "B"
  },
  {
    nombreAlumno: "JOSÉ RAMÍREZ",
    programa: "PLAN REGULAR",
    PA_SP: "A",
    PA_CE: "D"
  },
  {
    nombreAlumno: "LAURA TORRES",
    programa: "PROSECUCION",
    PA_SP: "D",
    PA_CE: "D"
  },
  {
    nombreAlumno: "MIGUEL HERNÁNDEZ",
    programa: "PLAN REGULAR",
    PA_SP: "C",
    PA_CE: "B"
  },
  {
    nombreAlumno: "CARMEN SILVA",
    programa: "PROSECUCION",
    PA_SP: "B",
    PA_CE: "C"
  },
  {
    nombreAlumno: "RODRIGO CASTRO",
    programa: "PLAN REGULAR",
    PA_SP: "C",
    PA_CE: "C"
  },
  {
    nombreAlumno: "VALERIA MORALES",
    programa: "PROSECUCION",
    PA_SP: "C",
    PA_CE: "A"
  },
  {
    nombreAlumno: "DIEGO FERNÁNDEZ",
    programa: "PLAN REGULAR",
    PA_SP: "A",
    PA_CE: "C"
  },
  {
    nombreAlumno: "SOFÍA JIMÉNEZ",
    programa: "PROSECUCION",
    PA_SP: "D",
    PA_CE: "D"
  },
  {
    nombreAlumno: "LUIS ROJAS",
    programa: "PLAN REGULAR",
    PA_SP: "B",
    PA_CE: "C"
  },
  {
    nombreAlumno: "ISABEL ORTEGA",
    programa: "PROSECUCION",
    PA_SP: "D",
    PA_CE: "B"
  },
  {
    nombreAlumno: "TOMÁS RUIZ",
    programa: "PLAN REGULAR",
    PA_SP: "B",
    PA_CE: "D"
  },
  {
    nombreAlumno: "SANDRA LÓPEZ",
    programa: "PLAN REGULAR",
    PA_SP: "D",
    PA_CE: "C"
  },
  {
    nombreAlumno: "PABLO GARCÍA",
    programa: "PROSECUCION",
    PA_SP: "C",
    PA_CE: "C"
  },
  {
    nombreAlumno: "MÓNICA MARTÍNEZ",
    programa: "PLAN REGULAR",
    PA_SP: "A",
    PA_CE: "B"
  },
  {
    nombreAlumno: "FABIOLA CASTAÑEDA",
    programa: "PROSECUCION",
    PA_SP: "C",
    PA_CE: "D"
  }
];

public obtenerResultadosPorTema(): Observable<resultadoPorTemas[]>{
    return of(this.resultadosPorTemas)
}

public obtenerResultadosPorEstandares(): Observable<resultadoPorEstandares[]>{
    return of(this.resultadosPorEstandares)
}

public obtenerResultadosPorPA(): Observable<resultadoPorPA[]>{
  return of(this.resultadosPorPA)
}

public obtenerListaResultado(): Observable<resultadosEnd[]>{
  return of(this.listaResultados)
}

}
