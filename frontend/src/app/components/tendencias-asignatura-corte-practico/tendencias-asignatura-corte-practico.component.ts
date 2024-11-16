import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-tendencias-asignatura-corte-practico',
  standalone: true,
  imports: [ReactiveFormsModule, ChartModule, CommonModule, FormsModule],
  templateUrl: './tendencias-asignatura-corte-practico.component.html',
  styleUrls: ['./tendencias-asignatura-corte-practico.component.css']
})
export class TendenciasAsignaturaCortePracticoComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.cohortes = Array.from(new Set(this.resumenAsignaturas.map(a => a.cohorte))).sort()
    this.cohortesSeleccionado = [...this.cohortes]
    this.cargarDatos()
  }

  public resumenAsignaturas = [
    { asignatura: 'Asignatura 1', semestre: 'Semestre I', cohorte: 2018, promedio: 3.6, aprobacion: 40 },
    { asignatura: 'Asignatura 1', semestre: 'Semestre I', cohorte: 2019, promedio: 4.0, aprobacion: 60 },
    { asignatura: 'Asignatura 2', semestre: 'Semestre II', cohorte: 2019, promedio: 4.5, aprobacion: 55 },
    { asignatura: 'Asignatura 3', semestre: 'Semestre III', cohorte: 2020, promedio: 5.0, aprobacion: 70 },
    { asignatura: 'Asignatura 1', semestre: 'Semestre I', cohorte: 2020, promedio: 3.8, aprobacion: 50 },
  ]

  public lineChartData: any
  public lineChartOptions: any
  public barChartData: any
  public barChartOptions: any
  public cohortes: number[]=[]
  public cohortesSeleccionado: number[]=[]

  public cargarDatos() {
    const cohortesFiltrados = this.cohortesSeleccionado.length > 0
      ? this.cohortesSeleccionado
      : this.cohortes
    const separarCohortes = Array.from(new Set(this.resumenAsignaturas.map(a => a.cohorte))).sort()
    const separarAsignaturas = Array.from(new Set(this.resumenAsignaturas.map(a => a.asignatura)))

    const asignaturaColores: { [key: string]: string } = {}

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    separarAsignaturas.forEach(asignatura => {
      asignaturaColores[asignatura] = getRandomColor()
    })

    const datasets = cohortesFiltrados.map(cohorte => {
      const dataPorCohorte = separarAsignaturas.map(asignatura => {
        const asignaturasCohorte = this.resumenAsignaturas.filter(a => a.cohorte === cohorte && a.asignatura === asignatura)
        const promedio = asignaturasCohorte.length > 0
          ? asignaturasCohorte.reduce((sum, a) => sum + a.promedio, 0) / asignaturasCohorte.length
          : 0
        return parseFloat(promedio.toFixed(1))
      })

      return {
        label: 'Cohorte ' + cohorte,
        data: dataPorCohorte,
        fill: false,
        borderColor: getRandomColor(), 
        tension: 0.4
      }
    })

    const aprobacionPorAsignatura: number[] = separarAsignaturas.map(asignatura => {
      const aprobaciones = this.resumenAsignaturas.filter(a => a.asignatura === asignatura).map(a => a.aprobacion)
      const aprobacionPromedio = aprobaciones.length > 0
        ? aprobaciones.reduce((sum, aprobacion) => sum + aprobacion, 0) / aprobaciones.length
        : 0
      return parseFloat(aprobacionPromedio.toFixed(1))
    })

    this.lineChartData = {
      labels: separarAsignaturas, 
      datasets: datasets,

    }

    this.lineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        x: {
          grid: {
            color: '#e0e0e0'
          }
        },
        y: {
          min: 1,
          max: 7,
          ticks: {
            callback: function(value: number) {
              return value.toFixed(1);
            }
          },
          grid: {
            color: '#e0e0e0'
          }
        }
      },
      backgroundColor: '#ffffff'
    }

    this.barChartData = {
      labels: separarAsignaturas,
      datasets: [{
        label: 'Aprobación Promedio (Cohorte ' + separarCohortes[separarCohortes.length - 1] + ')',
        backgroundColor: separarAsignaturas.map(asignatura => asignaturaColores[asignatura]),
        data: aprobacionPorAsignatura
      }]
    }

    this.barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true, 
          labels: {
            usePointStyle: true,
            color: '#000', 
            boxWidth: 0 
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#e0e0e0'
          }
        },
        y: {
          min: 0,
          max: 100, 
          ticks: {
            stepSize: 10,
            callback: function(value: number) {
              return value.toFixed(0)
            }
          },
          grid: {
            color: '#e0e0e0'
          }
        }
      },
      backgroundColor: '#ffffff'
    }
  }

  aplicarFiltro() {
    this.cargarDatos()
  }
}