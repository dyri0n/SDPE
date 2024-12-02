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
    nombreAsignatura: string;
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

  //esta funcion obtiene los datos para el resumen de asignaturas y haciendo los calculos para los promedios y aprobaciones por cada cohorte
  public obtenerResumenAsignaturas(){
    //por cada asignatura calculamos los promedios y aprobaciones por cohorte
    this.asignaturasCortePractico.forEach(asignatura => {
      //estas constantes guardan los promedios y aprobaciones por cohorte
      const cohortePromedios: { [cohorte: string]: number[] } = {}
      const cohorteAprobaciones: { [cohorte: string]: number[] } = {}
      //por cada cohorte vemos si esta en el los arregles y si no esta lo metemos
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
      //recorremos los promedios por cohorte para calcular el promedio que tuvo ese cohorte
      Object.keys(cohortePromedios).forEach(cohorte => {
        //guardamos los promedios
        const promedios = cohortePromedios[cohorte]
        //hacemos el calculo y guardmaos los promedios por cohorte
        const promedioCohorte = parseFloat((promedios.reduce((acc, promedio) => acc + promedio, 0) / promedios.length).toFixed(2))
        //llamamos a la funcion para calcular los porcentajes de aprobacion por cohorte y lo guardamos
        const porcentajeAprobacion = this.calcularPorcentajeAprobacion(cohorteAprobaciones, cohorte)
        //creamos los datos por cada cohorte
        const datoCohorte = {
          nombreAsignatura: asignatura.asignaturas.nombreAsignatura,
          posicion: asignatura.asignaturas.semestreRealizacion,
          cohorte: cohorte,
          promedio: promedioCohorte,
          porcentajeAprobacion: porcentajeAprobacion
        }
        //guardamos los datos de cada cohorte
        this.datosAgrupados.push(datoCohorte)
      })
    })
    //llamamos a la funcion para filtar por cohorte y paginar los datos
    this.aplicarFiltroCohorte()
    this.actualizarDatosPaginados()
  }

  //esta funcion crea un color random
  public colorRandom() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  //esta funcion obtiene los datos para el grafico de barras
  public obtenerDatosGraficoDeBarras() {
    //filtramos las asignaturas por semestre y cohorte
    const asignaturasFiltradas = this.asignaturasCortePractico.filter(asignatura => {
      return (
        (!this.semestreSeleccionadoTest || asignatura.asignaturas.semestreRealizacion === Number(this.semestreSeleccionadoTest)) && asignatura.aprobaciones.cohortes.some(a => a.cohorte === Number(this.cohorteSeleccionadoGraficoBarras))
      )
    })
    //guardamos los nombres de las asignaturas
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignaturas).map(a => a.nombreAsignatura)))
    //guardamos la informacion para el grafico de barra filtrando solo los que no sean null
    const datosGraficoDeBarra = separarAsignaturas.map(asignatura => {
      //guardamos las aprobaciones de las asignaturas filtradas
      const aprobaciones = asignaturasFiltradas.filter(a => a.asignaturas.nombreAsignatura === asignatura).flatMap(a=>a.aprobaciones.cohortes.filter(cohortes=>cohortes.cohorte===Number(this.cohorteSeleccionadoGraficoBarras))).map(a=>a.aprobacion)
      //calculamos la suma de las aprobaciones filtradas por la cantidad de aprobaciones
      const aprobacionPromedio = aprobaciones.length > 0 ? aprobaciones.reduce((sum, aprobacion) => sum + aprobacion, 0) / aprobaciones.length: 0
      //comprobamos si hay una aprobacion promedio
      if (aprobacionPromedio > 0) {
        //si hay una aprobacion promedio devuelve el nombre de la asignatura y la aprobacion promedio
        return {
          label: asignatura,
          data: parseFloat(aprobacionPromedio.toFixed(1)),
        }
      } else {
        //si no hay una aprobacion promedio devuelve null
        return null
      }
    }).filter(item => item !== null)
    //guardamos los nombres de la asignatura para el grafico
    const labels = datosGraficoDeBarra.map(item => item.label)
    //guardamos la aprobacion promedio por asignatura y comprobamos si los datos estan en el rango criticos
    //en caso de estar en el rango critico se le asigna un colo especifico para el fondo y el borde
    const datasets = [{
      label: `Aprobación Promedio (Cohorte ${this.cohorteSeleccionadoGraficoBarras})`,
      backgroundColor: datosGraficoDeBarra.map(item => {
        if(item.data>this.corteAprobacion){
          return this.colorRandom()
        }else{
          return 'rgba(255, 99, 132, 0.3)'  
        }
      }),
      borderWidth: datosGraficoDeBarra.map(item => {
        if(item.data>this.corteAprobacion){
          return 0
        }else{
          return 2
        }
      }), 
      borderColor: datosGraficoDeBarra.map(item => {
        if(item.data>this.corteAprobacion){
          return 'black'
        }else{
          return 'rgba(255, 99, 132, 1)' 
        }
      }),
      data: datosGraficoDeBarra.map(item => item.data)
    }]
    //guardamos la informacion para el grafico de barras
    this.datosGraficoDeBarras={labels,datasets}
  }

  //funcion para obtener los datos para el grafico de lineas
  public obtenerDatosGraficoDeLineas(){
    //guarda los datos para el grafico de linea llamando a la funcion filtrarDatosGraficosDeLineas para obtener los datos
    this.datosGraficoDeLineas = {
      labels: Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura=>asignatura.asignaturas).map(a => a.nombreAsignatura))),
      datasets: this.filtrarDatosGraficoDeLineas()
    }
    //ordenamos los cohortes por numero en el titulo
    this.datosGraficoDeLineas.datasets.sort((a: { label: string }, b: { label: string }) => {
      const cohorteA = parseInt(a.label.match(/\d+/)?.[0] || '0')
      const cohorteB = parseInt(b.label.match(/\d+/)?.[0] || '0')
      return cohorteA - cohorteB
    })
    //ordenamos los cohortes seleccionados en el selector multiple
    this.cohortesSeleccionadoGraficoLineas.sort((a,b)=>a.value - b.value)
  }

  //esta funcion filtra los datos para el grafico de lineas
  public filtrarDatosGraficoDeLineas() {
    //gaurdamos los cohortes seleccionados
    const cohortesFiltrados = this.cohortesSeleccionadoGraficoLineas.map(c => c.value)
    //guardamos los id de las asignaturas de forma unica
    const separarAsignaturas = Array.from(new Set(this.asignaturasCortePractico.flatMap(asignatura => asignatura.asignaturas).map(a => a.idAsignatura)))
    //filtramos las asignaturas por los cohortes seleccionados, calculamos el promedio y le damos el formato para el grafico de lineas
    return cohortesFiltrados.map(cohorte => {
      //guardamos los promedios por cohorte
      const dataPorCohorte = separarAsignaturas.map(asignatura => {
        //comprobamos que el promedio de las asignaturas sean del cohorte
        const asignaturasCohorte = this.asignaturasCortePractico .filter(a => a.promedios.cohortes.some(aa => aa.cohorte === cohorte) && a.asignaturas.idAsignatura === asignatura)
        //sumamos los promedios que correspondan al cohorte y lo dividimos por la cantidad de asignaturas
        const promedio = asignaturasCohorte.length > 0 ? asignaturasCohorte.map(a => a.promedios.cohortes.find(cohorteItem => cohorteItem.cohorte === cohorte)?.promedio).filter(prom => prom !== undefined)[0]: null
        //devolvemos el promedio
        return promedio !== null ? parseFloat(promedio.toFixed(1)) : null
      })
      //devolvemos con forma para el grafico de lineas
      return {
        label: 'Cohorte ' + cohorte,
        data: dataPorCohorte,
        backgroundColor: 'rgba(66, 165, 245, 0.1)',
        fill: false,
        borderColor: this.colorRandom(),
        tension: 0.4,
        borderWidth: 6,
        pointRadius: 8
      }
    })

  }
}