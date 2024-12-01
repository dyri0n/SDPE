import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { TendenciaService } from '../../services/tendencia.service';
import { ReporteAsignaturaDTO, TendenciasCortePracticoDTO } from '../../models/asignatura.dto';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { DetallesPracticaDTO } from '../../models/practica';

Chart.register(annotationPlugin)

@Component({
  selector: 'app-tendencias-asignatura-corte-practico',
  standalone: true,
  imports: [ReactiveFormsModule, ChartModule, CommonModule, FormsModule, MultiSelectModule, PaginatorModule],
  templateUrl: './tendencias-asignatura-corte-practico.component.html',
  styleUrls: ['./tendencias-asignatura-corte-practico.component.css']
})
export class TendenciasAsignaturaCortePracticoComponent implements OnInit {

  constructor(
    private tendenciaService: TendenciaService
  ) {}

  ngOnInit(): void {
    /*this.tendenciaService.obtenerAsignaturasTest().subscribe(respuesta=>{
      console.log(respuesta)
      this.asignaturasCortePractico=respuesta
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      this.cohortesTest = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.promedios.cohortes).map(cohorte=>cohorte.agnioIngreso))).sort()
      this.semestresTest = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignatura).map(a => a.posicion))).sort((a, b) => Number(a) - Number(b))
      this.cohortesGraficoLineasTest = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.promedios.cohortes).map(a => a.agnioIngreso))).sort().map(cohorte => ({ label: cohorte.toString(), value: cohorte }))
      this.cohortesSeleccionadoGraficoLineasTest = [...this.cohortesGraficoLineasTest]
      this.cohorteSeleccionadoGraficoBarrasTest= Math.max(...this.cohortesTest)
      this.datosAgrupadosFiltrados = [...this.datosAgrupados]
      this.cargarDatos()
    })*/
    this.tendenciaService.obtenerAsignaturasTestNuevo().subscribe(respuesta=>{
      console.log(respuesta)
      this.asignaturasCortePracticoNuevo=respuesta
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      this.cohortesTest = Array.from(new Set(this.asignaturasCortePracticoNuevo.flatMap(asignatura=>asignatura.promedios.cohortes).map(cohorte=>cohorte.cohorte))).sort()
      this.semestresTest = Array.from(new Set(this.asignaturasCortePracticoNuevo.flatMap(asignatura=>asignatura.asignaturas).map(a => a.semestreRealizacion))).sort((a, b) => Number(a) - Number(b))
      this.cohortesGraficoLineasTest = Array.from(new Set(this.asignaturasCortePracticoNuevo.flatMap(asignatura=>asignatura.promedios.cohortes).map(a => a.cohorte))).sort().map(cohorte => ({ label: cohorte.toString(), value: cohorte }))
      this.cohortesSeleccionadoGraficoLineasTest = [...this.cohortesGraficoLineasTest]
      this.cohorteSeleccionadoGraficoBarrasTest= Math.max(...this.cohortesTest)
      this.datosAgrupadosFiltrados = [...this.datosAgrupados]
      this.cargarDatosNuevo()
    })
  }

  public asignaturasCortePractico: TendenciasCortePracticoDTO[]=[]
  public asignaturasCortePracticoNuevo: ReporteAsignaturaDTO[]=[]
  public cohortesTest: number[]=[]
  public cohortesGraficoLineasTest: {label: string; value: number}[] = []
  public cohortesSeleccionadoGraficoLineasTest: {label: string; value: number}[] = []
  public lineChartDataTest: any
  public semestresTest: number[]=[]
  public cohorteSeleccionadoGraficoBarrasTest: number=0
  public barChartDataTest: any
  public semestreSeleccionadoTest: number | ""=""
  public datosAgrupados: {
    idAsignatura: number;
    posicion: number;
    cohorte: string;
    promedio: number;
    porcentajeAprobacion: number
  }[]=[]
  public datosAgrupadosFiltrados: any[] = []
  public datosAgrupadosPaginados: any[] = []
  public cohorteSeleccionado: string = ''
  public first: number = 0;
  public rows: number = 5;
  public totalRecords: number= 0
  public lineChartOptions: any
  public barChartOptions: any
  public corteAprobacion: number=90
  public cortePromedios: number=4
  public cargando: boolean=true
  
  public onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10; 
    this.actualizarDatosPaginados()
  }

  public actualizarDatosPaginados() {
    const inicio = this.first
    const final = this.first + this.rows
    this.datosAgrupadosPaginados = this.datosAgrupadosFiltrados.slice(inicio, final)
  }

  public aplicarFiltroCohorte(): void {
    if (this.cohorteSeleccionado) {
      this.datosAgrupadosFiltrados = this.datosAgrupados.filter(item => item.cohorte === this.cohorteSeleccionado)
    } else {
      this.datosAgrupadosFiltrados = [...this.datosAgrupados]
    }
    this.totalRecords=this.datosAgrupadosFiltrados.length
    this.first=0
  }

  public aplicarFiltroCohorteNuevo(): void {
    if (this.cohorteSeleccionado) {
      this.datosAgrupadosFiltrados = this.datosAgrupados.filter(item => item.cohorte === this.cohorteSeleccionado)
    } else {
      this.datosAgrupadosFiltrados = [...this.datosAgrupados]
    }
    this.totalRecords=this.datosAgrupadosFiltrados.length
    this.first=0
  }

  public calcularPorcentajeAprobacion(cohorteAprobaciones: { [cohorte: string]: number[] } = {}, cohorte: string): number {
    let aprobacionCohorte=0
    const aprobaciones= cohorteAprobaciones[cohorte]
    aprobacionCohorte= parseFloat((aprobaciones.reduce((acc, aprobacion)=>acc+aprobacion,0)/aprobaciones.length).toFixed(2))
    return aprobacionCohorte
  }

  /*public cargarDatos() {
    this.datosAgrupados=[]

    this.asignaturasCortePractico.forEach(asignatura => {
      const cohortePromedios: { [cohorte: string]: number[] } = {}
      const cohorteAprobaciones: { [cohorte: string]: number[] } = {}
    
      asignatura.promedios.cohortes.forEach(cohorte => {
        if (!cohortePromedios[cohorte.agnioIngreso]) {
          cohortePromedios[cohorte.agnioIngreso] = []
        }
        cohortePromedios[cohorte.agnioIngreso].push(cohorte.promedio)
      })

      asignatura.aprobaciones.cohortes.forEach(cohorte=>{
        if(!cohorteAprobaciones[cohorte.cohorte]){
          cohorteAprobaciones[cohorte.cohorte]=[]
        }
        cohorteAprobaciones[cohorte.cohorte].push(cohorte.aprobacion)
      })
    
      Object.keys(cohortePromedios).forEach(cohorte => {
        const promedios = cohortePromedios[cohorte]
        const promedioCohorte = parseFloat((promedios.reduce((acc, promedio) => acc + promedio, 0) / promedios.length).toFixed(2))
        const porcentajeAprobacion = this.calcularPorcentajeAprobacion(cohorteAprobaciones, cohorte)
        const datoCohorte = {
          idAsignatura: asignatura.asignatura.idAsignatura,
          posicion: asignatura.asignatura.posicion,
          cohorte: cohorte,
          promedio: promedioCohorte,
          porcentajeAprobacion: porcentajeAprobacion
        }
        this.datosAgrupados.push(datoCohorte)
      })
      
    })

    this.lineChartDataTest = {
      labels: Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignatura).map(a => a.idAsignatura))),
      datasets: this.filtrarDatosLineChartTest()
    }

    this.lineChartDataTest.datasets.sort((a: { label: string }, b: { label: string }) => {
      const cohorteA = parseInt(a.label.match(/\d+/)?.[0] || '0')
      const cohorteB = parseInt(b.label.match(/\d+/)?.[0] || '0')
      return cohorteA - cohorteB
    })

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
        },
        annotation: {
          annotations: {
            criticalZone: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              yMin: 0,
              yMax: this.cortePromedios,
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          }
        },
        datalabels: {
          display: true,
          align: 'top', 
          font: {
            weight: 'bold', 
            size: 12, 
          },
          color: '#000', 
          backgroundColor: '#FFF',
          borderRadius: 3, 
          padding: 5, 
          borderColor: '#000', 
          borderWidth: 2, 
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
          },
          title: {
            display: true,
            text: 'Asignaturas',
            font: {
              size: 24
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
          },
          title: {
            display: true,
            text: 'Notas',
            font: {
              size:24
            }
          },
          suggestedMin: 0,
          suggestedMax: 7
        }
      },
      backgroundColor: '#ffffff'
    }

    this.barChartDataTest= this.filtrarDatosBarChartTest()

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
              size: 24
            }
          }
        },
        datalabels: {
          display: true,
          color: 'white',
          align: 'center',
          font: {
            weight: 'bold',
            size: 16
          },
          backgroundColor: 'black',
          borderRadius: 4,
          padding: 6,
          borderColor: 'white',
          borderWidth: 2,
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
          },
          title: {
            display: true,
            text: 'Asignaturas',
            font: {
              size: 24
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
          },
          title: {
            display: true,
            text: 'Porcentaje Aprobación',
            font: {
              size: 24
            }
          }
        }
      },
      backgroundColor: '#ffffff'
    }

    this.aplicarFiltroCohorte()
    this.actualizarDatosPaginados()
    this.cohortesSeleccionadoGraficoLineasTest.sort((a,b)=>a.value - b.value)
  }*/

  public cargarDatosNuevo() {
    this.datosAgrupados=[]

    this.asignaturasCortePracticoNuevo.forEach(asignatura => {
      const cohortePromedios: { [cohorte: string]: number[] } = {}
      const cohorteAprobaciones: { [cohorte: string]: number[] } = {}
    
      asignatura.promedios.cohortes.forEach(cohorte => {
        if (!cohortePromedios[cohorte.cohorte]) {
          cohortePromedios[cohorte.cohorte] = []
        }
        cohortePromedios[cohorte.cohorte].push(cohorte.promedio)
      })

      asignatura.aprobaciones.cohortes.forEach(cohorte=>{
        if(!cohorteAprobaciones[cohorte.cohorte]){
          cohorteAprobaciones[cohorte.cohorte]=[]
        }
        cohorteAprobaciones[cohorte.cohorte].push(cohorte.aprobacion)
      })
    
      Object.keys(cohortePromedios).forEach(cohorte => {
        const promedios = cohortePromedios[cohorte]
        const promedioCohorte = parseFloat((promedios.reduce((acc, promedio) => acc + promedio, 0) / promedios.length).toFixed(2))
        const porcentajeAprobacion = this.calcularPorcentajeAprobacion(cohorteAprobaciones, cohorte)
        const datoCohorte = {
          idAsignatura: asignatura.asignaturas.idAsignatura,
          posicion: asignatura.asignaturas.semestreRealizacion,
          cohorte: cohorte,
          promedio: promedioCohorte,
          porcentajeAprobacion: porcentajeAprobacion
        }
        this.datosAgrupados.push(datoCohorte)
      })
      
    })

    this.lineChartDataTest = {
      labels: Array.from(new Set(this.asignaturasCortePracticoNuevo.flatMap(asignatura=>asignatura.asignaturas).map(a => a.nombreAsignatura))),
      datasets: this.filtrarDatosLineChartTestNuevo()
    }

    this.lineChartDataTest.datasets.sort((a: { label: string }, b: { label: string }) => {
      const cohorteA = parseInt(a.label.match(/\d+/)?.[0] || '0')
      const cohorteB = parseInt(b.label.match(/\d+/)?.[0] || '0')
      return cohorteA - cohorteB
    })

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
        },
        annotation: {
          annotations: {
            criticalZone: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              yMin: 0,
              yMax: this.cortePromedios,
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          }
        },
        datalabels: {
          display: true,
          align: 'top', 
          font: {
            weight: 'bold', 
            size: 12, 
          },
          color: '#000', 
          backgroundColor: '#FFF',
          borderRadius: 3, 
          padding: 5, 
          borderColor: '#000', 
          borderWidth: 2, 
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
          },
          title: {
            display: true,
            text: 'Asignaturas',
            font: {
              size: 24
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
          },
          title: {
            display: true,
            text: 'Notas',
            font: {
              size:24
            }
          },
          suggestedMin: 0,
          suggestedMax: 7
        }
      },
      backgroundColor: '#ffffff'
    }

    this.barChartDataTest= this.filtrarDatosBarChartTestNuevo()

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
              size: 24
            }
          }
        },
        datalabels: {
          display: true,
          color: 'white',
          align: 'center',
          font: {
            weight: 'bold',
            size: 16
          },
          backgroundColor: 'black',
          borderRadius: 4,
          padding: 6,
          borderColor: 'white',
          borderWidth: 2,
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
          },
          title: {
            display: true,
            text: 'Asignaturas',
            font: {
              size: 24
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
          },
          title: {
            display: true,
            text: 'Porcentaje Aprobación',
            font: {
              size: 24
            }
          }
        }
      },
      backgroundColor: '#ffffff'
    }

    this.aplicarFiltroCohorteNuevo()
    this.actualizarDatosPaginados()
    this.cohortesSeleccionadoGraficoLineasTest.sort((a,b)=>a.value - b.value)
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  public filtrarDatosBarChartTest() {
    const asignaturasFiltradas = this.asignaturasCortePractico.filter(asignatura => {
      return (
        (!this.semestreSeleccionadoTest || asignatura.asignatura.posicion === Number(this.semestreSeleccionadoTest)) && asignatura.aprobaciones.cohortes.some(a => a.cohorte === Number(this.cohorteSeleccionadoGraficoBarrasTest))
      )
    })
  
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignatura).map(a => a.idAsignatura)))
  
    const filteredData = separarAsignaturas.map(asignatura => {
      const aprobaciones = asignaturasFiltradas.filter(a => a.asignatura.idAsignatura === asignatura).flatMap(a=>a.aprobaciones.cohortes.filter(cohortes=>cohortes.cohorte===Number(this.cohorteSeleccionadoGraficoBarrasTest))).map(a=>a.aprobacion)

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
  
    return {
      labels: labels,
      datasets: [{
        label: `Aprobación Promedio (Cohorte ${this.cohorteSeleccionadoGraficoBarrasTest})`,
        backgroundColor: filteredData.map(item => {
          if(item.data>this.corteAprobacion){
            return this.getRandomColor()
          }else{
            return 'rgba(255, 99, 132, 0.3)'  
          }
        }),
        borderWidth: filteredData.map(item => {
          if(item.data>this.corteAprobacion){
            return 0
          }else{
            return 2
          }
        }), 
        borderColor: filteredData.map(item => {
          if(item.data>this.corteAprobacion){
            return 'black'
          }else{
            return 'rgba(255, 99, 132, 1)' 
          }
        }),
        data: filteredData.map(item => item.data)
      }]
    }
  }

  public filtrarDatosBarChartTestNuevo() {
    const asignaturasFiltradas = this.asignaturasCortePracticoNuevo.filter(asignatura => {
      return (
        (!this.semestreSeleccionadoTest || asignatura.asignaturas.semestreRealizacion === Number(this.semestreSeleccionadoTest)) && asignatura.aprobaciones.cohortes.some(a => a.cohorte === Number(this.cohorteSeleccionadoGraficoBarrasTest))
      )
    })
  
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePracticoNuevo.flatMap(asignatura=>asignatura.asignaturas).map(a => a.nombreAsignatura)))
  
    const filteredData = separarAsignaturas.map(asignatura => {
      const aprobaciones = asignaturasFiltradas.filter(a => a.asignaturas.nombreAsignatura === asignatura).flatMap(a=>a.aprobaciones.cohortes.filter(cohortes=>cohortes.cohorte===Number(this.cohorteSeleccionadoGraficoBarrasTest))).map(a=>a.aprobacion)

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
  
    return {
      labels: labels,
      datasets: [{
        label: `Aprobación Promedio (Cohorte ${this.cohorteSeleccionadoGraficoBarrasTest})`,
        backgroundColor: filteredData.map(item => {
          if(item.data>this.corteAprobacion){
            return this.getRandomColor()
          }else{
            return 'rgba(255, 99, 132, 0.3)'  
          }
        }),
        borderWidth: filteredData.map(item => {
          if(item.data>this.corteAprobacion){
            return 0
          }else{
            return 2
          }
        }), 
        borderColor: filteredData.map(item => {
          if(item.data>this.corteAprobacion){
            return 'black'
          }else{
            return 'rgba(255, 99, 132, 1)' 
          }
        }),
        data: filteredData.map(item => item.data)
      }]
    }
  }

  /*public filtrarDatosLineChartTest() {
    const cohortesFiltrados = this.cohortesSeleccionadoGraficoLineasTest.map(c => c.value)
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura => asignatura.asignatura).map(a => a.idAsignatura)))
  
    return cohortesFiltrados.map(cohorte => {
      const dataPorCohorte = separarAsignaturas.map(asignatura => {
        const asignaturasCohorte = this.asignaturasCortePractico.filter(a => 
          a.promedios.cohortes.some(aa => aa.agnioIngreso === cohorte) && a.asignatura.idAsignatura === asignatura
        )
        const promedio = asignaturasCohorte.length > 0 ? asignaturasCohorte.map(a => a.promedios.cohortes.find(cohorteItem => cohorteItem.agnioIngreso === cohorte)?.promedio).filter(prom => prom !== undefined)[0]: null
      return promedio !== null ? parseFloat(promedio.toFixed(1)) : null
      })
  
      return {
        label: 'Cohorte ' + cohorte,
        data: dataPorCohorte,
        backgroundColor: 'rgba(66, 165, 245, 0.1)',
        fill: true,
        borderColor: this.getRandomColor(),
        tension: 0.4,
        borderWidth: 6,
        pointRadius: 8
      }
    })

  }*/

  public filtrarDatosLineChartTestNuevo() {
    const cohortesFiltrados = this.cohortesSeleccionadoGraficoLineasTest.map(c => c.value)
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePracticoNuevo.flatMap(asignatura => asignatura.asignaturas).map(a => a.idAsignatura)))
  
    return cohortesFiltrados.map(cohorte => {
      const dataPorCohorte = separarAsignaturas.map(asignatura => {
        const asignaturasCohorte = this.asignaturasCortePracticoNuevo.filter(a => 
          a.promedios.cohortes.some(aa => aa.cohorte === cohorte) && a.asignaturas.idAsignatura === asignatura
        )
        const promedio = asignaturasCohorte.length > 0 ? asignaturasCohorte.map(a => a.promedios.cohortes.find(cohorteItem => cohorteItem.cohorte === cohorte)?.promedio).filter(prom => prom !== undefined)[0]: null
      return promedio !== null ? parseFloat(promedio.toFixed(1)) : null
      })
  
      return {
        label: 'Cohorte ' + cohorte,
        data: dataPorCohorte,
        backgroundColor: 'rgba(66, 165, 245, 0.1)',
        fill: false,
        borderColor: this.getRandomColor(),
        tension: 0.4,
        borderWidth: 6,
        pointRadius: 8
      }
    })

  }
}