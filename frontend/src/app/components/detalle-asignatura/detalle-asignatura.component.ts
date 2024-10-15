import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-detalle-asignatura',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.chartData= {
      labels: ['cohorte 2020', 'cohorte 2021', 'cohorte 2022', 'cohorte 2023'],
      datasets: [
        {label: 'total', backgroundColor: '#54c45e', data: [90,60,70,80]},
        {label: 'ingreso planregular', backgroundColor: '#00c2a8', data:[30,50,40,60]},
        {label: 'ingrso prosecucion', backgroundColor: '#6db1ff', data:[20,30,60,70]}
      ]
    }
    this.chartOptions={
      responsive:true,
      plugins: {
        legend:{
          position: 'top'
        }
      },
      scales:{
        y:{
          beginAtZero: true,
          ticks:{
            callback: function(value: number){
              return value + '%'
            }
          }
        }
      }
    }
  }

  public chartData: any
  public chartOptions: any

}
