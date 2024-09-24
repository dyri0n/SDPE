import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ResultadosENDService } from '../../services/resultados-end.service';

@Component({
  selector: 'app-resultado-end',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './resultado-end.component.html',
  styleUrl: './resultado-end.component.css'
})
export class ResultadoEndComponent implements OnInit {

  constructor(
    private servicioResultadosEND: ResultadosENDService
  ){}

  ngOnInit() {
    this.obtenerResultadosPorTemas();
    this.obtenerResultadosPorEstandares();
    this.obtenerResultadosPorPA();
  }

  temasData: any;
  estandaresData: any;
  SPData: any;
  CEData: any;
  options: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Porcentaje de logro', 
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    },
    barPercentage: 0.7, 
    categoryPercentage: 0.7
  };

  PAOptions: any = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    barPercentage: 0.7, 
    categoryPercentage: 0.7
  }


  public promedio(numeros: number[]): number {
    const n = numeros.length;
    if (n === 0) return 0;

    let suma = 0;
    for (let i = 0; i < n; i++) {
      suma += numeros[i];
    }
    return Math.round((suma / n)*10)/10;
  }

  public mediana(numeros: number[]): number {
    if (numeros.length === 0) return 0; 
  
    const numerosOrdenados = numeros.slice().sort((a, b) => a - b);
    const mitad = Math.floor(numerosOrdenados.length / 2);

    if (numerosOrdenados.length % 2 === 0) {
      return (numerosOrdenados[mitad - 1] + numerosOrdenados[mitad]) / 2;
    } else {
      return numerosOrdenados[mitad];
    }
  }

  public porcentaje(arreglo: string[], letra: string): number {
    const totalLetras = arreglo.length;

    const contador = arreglo.filter(letraActual => letraActual === letra).length;

    const porcentaje = (contador / totalLetras) * 100;

    return Math.round(porcentaje*10)/10;
}

  public obtenerResultadosPorTemas(){
    let tema1: number[] = []
    let tema2: number[] = []
    let tema3: number[] = []
    
    this.servicioResultadosEND.obtenerResultadosPorTema().subscribe(resultados =>{

      resultados.forEach(resultado =>{
        tema1.push(resultado.porcentajeTemas[0]);
        tema2.push(resultado.porcentajeTemas[1]);
        tema3.push(resultado.porcentajeTemas[2]);
      })

      this.temasData = {
        labels: ['Tema 1', 'Tema 2', 'Tema 3'],
        datasets: [
          {
            label: 'Promedio',
            data: [this.promedio(tema1), this.promedio(tema2), this.promedio(tema3)],
            backgroundColor: 'rgba(94, 234, 212, 0.8)',
          },
          {
            label: 'Mediana',
            data: [this.mediana(tema1), this.mediana(tema2), this.mediana(tema3)],
            backgroundColor: 'rgba(13, 148, 136, 0.8)',
          },
          {
            label: 'Minimo',
            data: [Math.min(...tema1), Math.min(...tema2), Math.min(...tema3)],
            backgroundColor: 'rgba(17, 94, 89, 0.8)',
          },
          {
            label: 'Maximo',
            data: [Math.max(...tema1), Math.max(...tema2), Math.max(...tema3)],
            backgroundColor: 'rgba(4, 47, 46, 0.8)',
          }
        ]
      }
    })
  }

  public obtenerResultadosPorEstandares(){
    let estandar1: number[] = []
    let estandar2: number[] = []
    let estandar3: number[] = []
    let estandar4: number[] = []
    let estandar5: number[] = []
    let estandar6: number[] = []
    let estandar7: number[] = []
    let estandar8: number[] = []
    let estandar9: number[] = []
    let estandar10: number[] = []
    
    this.servicioResultadosEND.obtenerResultadosPorEstandares().subscribe(resultados =>{

      resultados.forEach(resultado =>{
        estandar1.push(resultado.porcentajeEstandares[0]);
        estandar2.push(resultado.porcentajeEstandares[1]);
        estandar3.push(resultado.porcentajeEstandares[2]);
        estandar4.push(resultado.porcentajeEstandares[3]);
        estandar5.push(resultado.porcentajeEstandares[4]);
        estandar6.push(resultado.porcentajeEstandares[5]);
        estandar7.push(resultado.porcentajeEstandares[6]);
        estandar8.push(resultado.porcentajeEstandares[7]);
        estandar9.push(resultado.porcentajeEstandares[8]);
        estandar10.push(resultado.porcentajeEstandares[9]);
      })

      this.estandaresData = {
        labels: ['Estandar 1', 'Estandar 2', 'Estandar 3', 'Estandar 4', 'Estandar 5', 'Estandar 6', 'Estandar 7', 'Estandar 8', 'Estandar 9', 'Estandar 10'],
        datasets: [
          {
            label: 'Promedio',
            data: [
              this.promedio(estandar1), 
              this.promedio(estandar2), 
              this.promedio(estandar3), 
              this.promedio(estandar4), 
              this.promedio(estandar5), 
              this.promedio(estandar6), 
              this.promedio(estandar7), 
              this.promedio(estandar8), 
              this.promedio(estandar9), 
              this.promedio(estandar10)
            ],
            backgroundColor: 'rgba(94, 234, 212, 0.8)',
          },
          {
            label: 'Mediana',
            data: [
              this.mediana(estandar1), 
              this.mediana(estandar2), 
              this.mediana(estandar3),
              this.mediana(estandar4),
              this.mediana(estandar5),
              this.mediana(estandar6),
              this.mediana(estandar7),
              this.mediana(estandar8),
              this.mediana(estandar9),
              this.mediana(estandar10),

            ],
            backgroundColor: 'rgba(13, 148, 136, 0.8)',
          },
          {
            label: 'Minimo',
            data: [
              Math.min(...estandar1), 
              Math.min(...estandar2), 
              Math.min(...estandar3),
              Math.min(...estandar4),
              Math.min(...estandar5),
              Math.min(...estandar6),
              Math.min(...estandar7),
              Math.min(...estandar8),
              Math.min(...estandar9),
              Math.min(...estandar10),

            ],
            backgroundColor: 'rgba(17, 94, 89, 0.8)',
          },
          {
            label: 'Maximo',
            data: [
              Math.max(...estandar1), 
              Math.max(...estandar2), 
              Math.max(...estandar3),
              Math.max(...estandar4),
              Math.max(...estandar5),
              Math.max(...estandar6),
              Math.max(...estandar7),
              Math.max(...estandar8),
              Math.max(...estandar9),
              Math.max(...estandar10),
            ],
            backgroundColor: 'rgba(4, 47, 46, 0.8)',
          }
        ]
      }
    })
  }

  public obtenerResultadosPorPA(){
    let situacionesPedagogicas: string[] = []
    let comunicacionEscrita: string[] = []
    
    this.servicioResultadosEND.obtenerResultadosPorPA().subscribe(resultados =>{

      resultados.forEach(resultado =>{
        situacionesPedagogicas.push(resultado.PA_SP);
        comunicacionEscrita.push(resultado.PA_CE);
      })

      this.SPData = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
          {
            label: 'Situaciones pedagógicas',
            data: [this.porcentaje(situacionesPedagogicas, 'A'), this.porcentaje(situacionesPedagogicas, 'B'), this.porcentaje(situacionesPedagogicas, 'C'), this.porcentaje(situacionesPedagogicas, 'D')],
            backgroundColor: ['rgba(145, 170, 211, 0.8)', 'rgba(42, 122, 255, 0.8)', 'rgba(39, 203, 155, 0.8)', 'rgba(97, 39, 203, 0.8)'],
          },
        ]
      }
      this.CEData = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
          {
            label: 'Comunicación Escrita',
            data: [this.porcentaje(comunicacionEscrita, 'A'), this.porcentaje(comunicacionEscrita, 'B'), this.porcentaje(comunicacionEscrita, 'C'), this.porcentaje(comunicacionEscrita, 'D')],
            backgroundColor: ['rgba(145, 170, 211, 0.8)', 'rgba(42, 122, 255, 0.8)', 'rgba(39, 203, 155, 0.8)', 'rgba(97, 39, 203, 0.8)'],
          },
        ]
      }
    })
  }
}
