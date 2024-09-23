import { Component, OnInit } from '@angular/core';
import { Chart, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { PromedioDiagnostico } from '../../models/diagnosticos.dto';


@Component({
  selector: 'app-estadistica-diagnostico',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './estadistica-diagnostico.component.html',
  styleUrl: './estadistica-diagnostico.component.css'
})
export class EstadisticaDiagnosticoComponent implements OnInit{
  //VERSION CON BARRAS DE DISTINTO COLOR Y LABELS 
  // public chartLabels: string[] = ['Prueba 1', 'Prueba 2', 'Prueba 3', 'Prueba 4'];

  // public chartData = [
  //   {
  //     label: 'Promedio Prueba 1',
  //     data: [75, 0, 0, 0],
  //     backgroundColor: 'rgba(255, 99, 132, 0.6)',
  //     borderColor: 'rgba(255, 99, 132, 1)',
  //     borderWidth: 1
  //   },
  //   {
  //     label: 'Promedio Prueba 2',
  //     data: [0, 80, 0, 0],
  //     backgroundColor: 'rgba(54, 162, 235, 0.6)',
  //     borderColor: 'rgba(54, 162, 235, 1)',
  //     borderWidth: 1
  //   },
  //   {
  //     label: 'Promedio Prueba 3',
  //     data: [0, 0, 85, 0],
  //     backgroundColor: 'rgba(255, 206, 86, 0.6)',
  //     borderColor: 'rgba(255, 206, 86, 1)',
  //     borderWidth: 1
  //   },
  //   {
  //     label: 'Promedio Prueba 4',
  //     data: [0, 0, 0, 90],
  //     backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //     borderColor: 'rgba(75, 192, 192, 1)',
  //     borderWidth: 1
  //   }
  // ];

  // public chartOptions = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       stacked: true, // Cambia a true si quieres apilar las barras
  //       ticks: {
  //         autoSkip: false // Esto permite mostrar todos los labels del eje x
  //       }
  //     },
  //     y: {
  //       beginAtZero: true
  //     }
  //   },
  //   barPercentage: 0.7, // Ajusta el porcentaje del ancho de las barras
  //   categoryPercentage: 0.7 // Ajusta el porcentaje del ancho del espacio entre las categorías
  // };

  ngOnInit(): void {
    this.obtenerNombreAsignatura();
    this.obtenerPromedios();
  }
  
  constructor(
    private servicioDiagnosticos: DiagnosticosService
  ){}
  

  public asignatura: string = '';
  public chartLabels: string[] = [];
  public data: number[] = [];
  public chartDatasets = [
    {
      label: 'Promedio',
      data: [0],
      backgroundColor: 'rgba(52, 211, 153, 1)',
      borderColor: 'rgba(5, 150, 105, 1)',
      borderWidth: 4
    }
  ];
  public chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,

    plugins: {
      title: {
          display: true,
          text: 'Promedio obtenido en cada evaluacion diagnostico',
      }
    },

    onClick: (event: ChartEvent, activeElements: any[]) => {
      if (activeElements.length > 0) {
        const datasetIndex = activeElements[0].datasetIndex;
        const dataIndex = activeElements[0].index;
        const clickedLabel = this.chartLabels[dataIndex];

        this.seleccionado(clickedLabel)
      
      }
    }

  };

  public seleccionado(diagnostic: string) {
    alert(`Has seleccionado: ${diagnostic}`);
  }

  public obtenerNombreAsignatura(){
    this.asignatura = this.servicioDiagnosticos.obtenerNombreAsignatura()
  }
  
  public obtenerLabel(datos: PromedioDiagnostico[]){
    datos.forEach(element => {
      this.chartLabels.push(element.año.toString())
    });
  }

  public obtenerDataset(datos: PromedioDiagnostico[]){
    datos.forEach(element => {
      this.data.push(element.promedio)
    });
    this.chartDatasets[0].data = this.data
  }
  
  public obtenerPromedios(){
    this.servicioDiagnosticos.obtenerPromedios().subscribe((diagnosticos) => {
      this.obtenerLabel(diagnosticos),
      this.obtenerDataset(diagnosticos)
    })
  }
}
