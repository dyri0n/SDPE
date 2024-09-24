import { Component, OnInit } from '@angular/core';
import { ChartEvent } from 'chart.js';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { PromedioDiagnostico } from '../../models/diagnosticos.dto';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-estadistica-diagnostico',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './estadistica-diagnostico.component.html',
  styleUrl: './estadistica-diagnostico.component.css'
})
export class EstadisticaDiagnosticoComponent implements OnInit{
  ngOnInit(): void {
    this.obtenerNombreAsignatura();
    this.obtenerPromedios();
  }
  
  constructor(
    private servicioDiagnosticos: DiagnosticosService
  ){}
  
  public asignatura: string = '';
  public labels: string[] = [];
  public data: any;

  public options = {
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
        const clickedLabel = this.labels[dataIndex];

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
  
  public obtenerLabel(datos: PromedioDiagnostico[]): string[]{
    datos.forEach(element => {
      this.labels.push(element.año.toString())
    });
    return this.labels
  }

  public obtenerDataset(datos: PromedioDiagnostico[]): number[]{
    let data: number[] = []
    datos.forEach(element => {
      data.push(element.promedio)
    });
    return data
  }
  
  public obtenerPromedios(){
    this.servicioDiagnosticos.obtenerPromedios().subscribe((diagnosticos) => {

      this.obtenerLabel(diagnosticos);

      this.data = {
        labels: this.labels,
        datasets: [
          {
            label: 'Promedio',
            data: this.obtenerDataset(diagnosticos),
            backgroundColor: 'rgba(52, 211, 153, 1)',
            borderColor: 'rgba(5, 150, 105, 1)',
            borderWidth: 4
          }
        ]
      }
    })
  }
}
