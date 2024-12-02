import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReporteAsignaturaDTO } from '../../models/asignatura.dto';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Router } from '@angular/router';
import { AsignaturaService } from '../../services/asignatura.service';

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
    private asiganturasService: AsignaturaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //llamamos al servicio para obtener los detalles de las asignaturas corte practico
    this.asiganturasService.obtenerDetalleAsignaturas().subscribe(respuesta=>{
      //guardamos los detalles de las asignaturas corte practico
      this.asignaturasCortePractico=respuesta
      //creamos un tiempo de espera
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      //guardamos de forma unica y ordenada los cohortes para el filtro de grafico barras y el resumen de asignatura
      this.cohortes = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.promedios.cohortes).map(cohorte=>cohorte.cohorte))).sort()
      //guardamos de forma unica y ordenada los semestres para el filtro de barras
      this.semestres = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignaturas).map(a => a.semestreRealizacion))).sort((a, b) => Number(a) - Number(b))
      //guardamos de forma unica y ordenada los cohortes para el filtrador multiple del grafico de lineas con el formato {label: string, value: number} 
      this.cohortesGraficoLineas = this.cohortes.sort().map(cohorte => ({ label: cohorte.toString(), value: cohorte }))
      //guardamos los cohortes seleccionados para el grafico de lineas
      this.cohortesSeleccionadoGraficoLineas = [...this.cohortesGraficoLineas]
      //guardamos el cohorte seleccionado para el grafico de barras
      this.cohorteSeleccionadoGraficoBarras= Math.max(...this.cohortes)
      //llamamos a la funcion para obtener los detalles de las asignaturas de corte practico
      this.obtenerDetallesDeAsignaturasDeCortePractico()
    })
  }

  //variable para guardar las asignaturas de corte practico
  public asignaturasCortePractico: ReporteAsignaturaDTO[]=[]
  //variable para guardar los cohortes para los filtros de grafico de barras y el resumen de asignatura
  public cohortes: number[]=[]
  //variable para guardar los cohortes para el filtro multiple grafico de lineas
  public cohortesGraficoLineas: {label: string; value: number}[] = []
  //variable para guardar los cohortes seleccionados en el filtro multiple del grafico de lineas
  public cohortesSeleccionadoGraficoLineas: {label: string; value: number}[] = []
  //variable para guardar los datos para el grafico de lineas
  public datosGraficoDeLineas: any
  //variable para guardar los semestres para el filtrador del grafico de barras
  public semestres: number[]=[]
  //variable para guardar el cohorte seleccionado en el grafico de barras
  public cohorteSeleccionadoGraficoBarras: number=0
  //variable para guardar los datos para el grafico de barras
  public datosGraficoDeBarras: any
  //variable para guardar el semestre seleccionado en el filtrador del grafico de barras
  public semestreSeleccionadoTest: number | ''=''
  //variable para guardar los datos para el resumen de asignaturas
  public datosAgrupados: {
    idAsignatura: number;
    posicion: number;
    cohorte: string;
    promedio: number;
    porcentajeAprobacion: number
  }[]=[]
  //variable para guardar los datos filtrados para el resumen de asignaturas
  public datosAgrupadosFiltrados: any[] = []
  //variable para guardar los datos paginados para el resumen de asignaturas
  public datosAgrupadosPaginados: any[] = []
  //variable para guardar el cohorte seleccionado en el filtrador del resumen de asignaturas
  public cohorteSeleccionado: string = ''
  //variable para indicar el primer registro en la pagina
  public inicio: number = 0
  //variable para indicar las filas que habran por pagina
  public filas: number = 5
  //variable para guardar la cantidad de asignaturas que hay
  public numeroAsignaturas: number= 0
  //variable para guardar el numero critico para el grafico de barras
  public corteAprobacion: number=90
  //variable para guardar el numero critico para el grafico de lineas
  public cortePromedios: number=4
  //variable para inicializar el tiempo de carga
  public cargando: boolean=true
  //variable para guardar las opciones del grafico de lineas
  public opcionesGraficoDeLineas = {
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
  //variable para guardar las opciones del grafico de barras
  public opcionesGraficoDeBarras = {
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

  //funcion para volver al menu
  public volverAlMenu(){
    this.router.navigateByUrl('/menu')
  }

  //funcion para actualizar valores al cambiar de pagina
  public cambioDePagina(event: PaginatorState) {
    //se actualiza el primer registro que se va a mostrar, si no existe se pone 0 por defecto
    this.inicio = event.first ?? 0
    //actualiza las filas de registros que se van a mostrar, si no existe se pone 5 por defecto
    this.filas = event.rows ?? 5
    //se llama a la funcion para actualizar los datos
    this.actualizarDatosPaginados()
  }

  //esta funcion actualiza los datos que se van a mostrar por pagina
  public actualizarDatosPaginados() {
    //establecemos el inicio y el final de los datos que vamos a mostrar
    const inicio = this.inicio
    const final = this.inicio + this.filas
    //guardamos los datos que estan en el rango que queremos mostrar
    this.datosAgrupadosPaginados = this.datosAgrupadosFiltrados.slice(inicio, final)
  }

  //esta funcion aplica el filtro de cohorte al resumen de asignaturas
  public aplicarFiltroCohorte(): void {
    //comprobamos si se selecciono un cohorte
    if (this.cohorteSeleccionado) {
      //si se selecciono un cohorte se hace un filtro y guardamos los datos que correspondan al cohorte seleccionado
      this.datosAgrupadosFiltrados = this.datosAgrupados.filter(item => item.cohorte === this.cohorteSeleccionado)
    } else {
      //si no se selecciono un cohorte se mantienen los mismos datos
      this.datosAgrupadosFiltrados = [...this.datosAgrupados]
    }
    //se actualiza el numero de asignaturas despues de aplicar el filtro
    this.numeroAsignaturas=this.datosAgrupadosFiltrados.length
    this.inicio=0
    this.actualizarDatosPaginados()
  }

  //esta funcion calcula el porcentaje de aprobacion para el resumen de asignaturas
  public calcularPorcentajeAprobacion(cohorteAprobaciones: { [cohorte: string]: number[] } = {}, cohorte: string): number {
    //creamos la aprobacion por cohorte en 0
    let aprobacionCohorte=0
    //obtenemos todas las aprobacion del cohorte que nos entreguen
    const aprobaciones= cohorteAprobaciones[cohorte]
    //sumamos todas las aprobaciones y las dividimos por la cantidad de aprobaciones
    aprobacionCohorte= parseFloat((aprobaciones.reduce((acc, aprobacion)=>acc+aprobacion,0)/aprobaciones.length).toFixed(2))
    //devolvemos el porcentaje de aprobacion del cohorte
    return aprobacionCohorte
  }

  //esta funcion obtiene los detalles de las asignaturas de corte practico para mostrar en los graficos de linea y de barras, y el resumen de asignatura
  public obtenerDetallesDeAsignaturasDeCortePractico() {
    //llamamos a la funcion para obtener los datos del resumen de asignaturas
    this.obtenerResumenAsignaturas()
    //llamamos a la funcion para obtener los datos para el grafico de lineas
    this.obtenerDatosGraficoDeLineas()
    //llamamos a la funcion para obtener los datos para el grafico de barras
    this.obtenerDatosGraficoDeBarras()

  }

  public obtenerResumenAsignaturas(){
    this.asignaturasCortePractico.forEach(asignatura => {
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
    this.aplicarFiltroCohorte()
    this.actualizarDatosPaginados()
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  public obtenerDatosGraficoDeBarras() {
    const asignaturasFiltradas = this.asignaturasCortePractico.filter(asignatura => {
      return (
        (!this.semestreSeleccionadoTest || asignatura.asignaturas.semestreRealizacion === Number(this.semestreSeleccionadoTest)) && asignatura.aprobaciones.cohortes.some(a => a.cohorte === Number(this.cohorteSeleccionadoGraficoBarras))
      )
    })
  
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignaturas).map(a => a.nombreAsignatura)))
  
    const filteredData = separarAsignaturas.map(asignatura => {
      const aprobaciones = asignaturasFiltradas.filter(a => a.asignaturas.nombreAsignatura === asignatura).flatMap(a=>a.aprobaciones.cohortes.filter(cohortes=>cohortes.cohorte===Number(this.cohorteSeleccionadoGraficoBarras))).map(a=>a.aprobacion)

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
  
    const datasets = [{
      label: `Aprobación Promedio (Cohorte ${this.cohorteSeleccionadoGraficoBarras})`,
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
    this.datosGraficoDeBarras={labels,datasets}
  }

  public obtenerDatosGraficoDeLineas(){
    this.datosGraficoDeLineas = {
      labels: Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignaturas).map(a => a.nombreAsignatura))),
      datasets: this.filtrarDatosGraficoDeLineas()
    }
    this.datosGraficoDeLineas.datasets.sort((a: { label: string }, b: { label: string }) => {
      const cohorteA = parseInt(a.label.match(/\d+/)?.[0] || '0')
      const cohorteB = parseInt(b.label.match(/\d+/)?.[0] || '0')
      return cohorteA - cohorteB
    })
    this.cohortesSeleccionadoGraficoLineas.sort((a,b)=>a.value - b.value)
  }

  public filtrarDatosGraficoDeLineas() {
    const cohortesFiltrados = this.cohortesSeleccionadoGraficoLineas.map(c => c.value)
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura => asignatura.asignaturas).map(a => a.idAsignatura)))
  
    return cohortesFiltrados.map(cohorte => {
      const dataPorCohorte = separarAsignaturas.map(asignatura => {
        const asignaturasCohorte = this.asignaturasCortePractico .filter(a => 
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