import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { TendenciaService } from '../../services/tendencia.service';


@Component({
  selector: 'app-tendencias-asignatura-corte-practico',
  standalone: true,
  imports: [ReactiveFormsModule, ChartModule, CommonModule, FormsModule, MultiSelectModule],
  templateUrl: './tendencias-asignatura-corte-practico.component.html',
  styleUrls: ['./tendencias-asignatura-corte-practico.component.css']
})
export class TendenciasAsignaturaCortePracticoComponent implements OnInit {

  constructor(
    private tendenciaService: TendenciaService
  ) {}

  ngOnInit(): void {
    this.tendenciaService.obtenerAsignaturas().subscribe(respuesta=>{
      this.resumenAsignaturas=respuesta
    })
    this.cohortes = Array.from(new Set(this.resumenAsignaturas.map(a => a.cohorte))).sort()
    this.cohortesGraficoLineas = Array.from(new Set(this.resumenAsignaturas.map(a => a.cohorte))).sort().map(cohorte => ({ label: cohorte.toString(), value: cohorte }))
    this.semestres = Array.from(new Set(this.resumenAsignaturas.map(a => a.semestre))).sort()
    this.cohortesSeleccionadoGraficoLineas = [...this.cohortesGraficoLineas]
    this.cohorteSeleccionadoGraficoBarras= Math.max(...this.cohortes)
    this.cargarDatos()
  }

  public resumenAsignaturas: any[] = []
  public lineChartData: any
  public lineChartOptions: any
  public barChartData: any
  public barChartOptions: any
  public cohortes: number[]=[]
  public cohortesGraficoLineas: { label: string; value: number; }[] = []
  public semestres: string[]=[]
  public cohortesSeleccionadoGraficoLineas: { label: string; value: number }[] = []
  public cohorteSeleccionadoGraficoBarras: number=0
  public semestreSeleccionado: string = ''
  public anioSeleccionado: number | null = null

  public cargarDatos() {
    this.lineChartData = {
      labels: Array.from(new Set(this.resumenAsignaturas.map(a => a.asignatura))),
      datasets: this.filtrarDatosLineChart(),
    }

    this.lineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 16
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#e0e0e0'
          },
          ticks: {
            font: {
              size: 16
            }
          }
        },
        y: {
          min: 1,
          max: 7,
          ticks: {
            callback: function(value: number) {
              return value.toFixed(1)
            },
            font: {
              size: 16
            },
            grid: {
              color: '#e0e0e0'
            }
          }
        }
      },
      backgroundColor: '#ffffff'
    }
  
    this.barChartData= this.filtrarDatosBarChart()

    this.barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true, 
          labels: {
            usePointStyle: true,
            color: '#000', 
            boxWidth: 0,
            font: {
              size: 16
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: '#e0e0e0'
          },
          ticks: {
            font: {
              size: 16
            }
          }
        },
        y: {
          min: 0,
          max: 100, 
          ticks: {
            stepSize: 10,
            callback: function(value: number) {
              return value.toFixed(0)
            },
            font: {
              size: 16
            },
            grid: {
              color: '#e0e0e0'
            }
          }
        }
      },
      backgroundColor: '#ffffff'
    }
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  public filtrarDatosBarChart() {
    const asignaturasFiltradas = this.resumenAsignaturas.filter(asignatura => {
      return (
        (!this.semestreSeleccionado || asignatura.semestre === this.semestreSeleccionado) && asignatura.cohorte === Number(this.cohorteSeleccionadoGraficoBarras)
      )
    })
  
    const separarAsignaturas = Array.from(new Set(this.resumenAsignaturas.map(a => a.asignatura)))
  
    const filteredData = separarAsignaturas.map(asignatura => {
      const aprobaciones = asignaturasFiltradas.filter(a => a.asignatura === asignatura).map(a => a.aprobacion)
      
      const aprobacionPromedio = aprobaciones.length > 0 ? aprobaciones.reduce((sum, aprobacion) => sum + aprobacion, 0) / aprobaciones.length: 0
  
      if (aprobacionPromedio > 0) {
        return {
          label: asignatura,
          data: parseFloat(aprobacionPromedio.toFixed(1)),
        }
      } else {
        return null
      }
    }).filter(item => item !== null)
  
    const labels = filteredData.map(item => item.label)
    const data = filteredData.map(item => item.data)
  
    return {
      labels: labels,
      datasets: [{
        label: `Aprobación Promedio (Cohorte ${this.cohorteSeleccionadoGraficoBarras})`,
        backgroundColor: labels.map(() => this.getRandomColor()),
        data: data
      }]
    }
  }

  public filtrarDatosLineChart() {
    const cohortesFiltrados = this.cohortesSeleccionadoGraficoLineas.map(c => c.value)  
    const separarAsignaturas = Array.from(new Set(this.resumenAsignaturas.map(a => a.asignatura)))
  
    return cohortesFiltrados.map(cohorte => {
      const dataPorCohorte = separarAsignaturas.map(asignatura => {
        const asignaturasCohorte = this.resumenAsignaturas.filter(
          a => a.cohorte === cohorte && a.asignatura === asignatura
        )
        const promedio = asignaturasCohorte.length > 0 ? asignaturasCohorte.reduce((sum, a) => sum + a.promedio, 0) / asignaturasCohorte.length : 0
        return parseFloat(promedio.toFixed(1))
      })
  
      return {
        label: 'Cohorte ' + cohorte,
        data: dataPorCohorte,
        fill: false,
        borderColor: this.getRandomColor(),
        tension: 0.4,
        borderWidth: 6,
        pointRadius: 8
      }
    })
  }

  public aplicarFiltro() {
    this.cargarDatos()
  }
}