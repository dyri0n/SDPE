import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { TendenciaService } from '../../services/tendencia.service';
import { AsignaturaService } from '../../services/asignatura.service';
import { ReporteAsignaturaDTO, TendenciasCortePracticoDTO } from '../../models/asignatura.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-asignatura',
  standalone: true,
  imports: [ChartModule, MultiSelectModule, FormsModule, CommonModule],
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent implements OnInit {

  constructor(
    private router: Router,
    private asignaturaService: AsignaturaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.codigoAsignatura = this.route.snapshot.paramMap.get('codigoAsignatura')!
    /*this.asignaturaService.obtenerDetalleAsignatura(this.idAsignatura).subscribe(respuesta=>{
      console.log(respuesta)
      this.detalleAsignatura=respuesta
      this.anios = Array.from(this.detalleAsignatura.promedios.general.map(promedio=>promedio.agnio)).sort()
      this.cohortesGraficoBarras = Array.from(new Set(this.detalleAsignatura.promedios.cohortes.map(a => a.agnioIngreso))).sort().map(cohorte => ({ label: cohorte.toString(), value: cohorte }))
      this.cohortesSeleccionadosGraficoBarras = [...this.cohortesGraficoBarras]
      this.cargarDatos()
    })*/
    this.asignaturaService.obtenerDetalleAsignaturaNuevo(this.codigoAsignatura).subscribe(respuesta=>{
      console.log(respuesta)
      this.detalleAsignaturaNuevo=respuesta
      this.anios = Array.from(this.detalleAsignaturaNuevo.promedios.general.map(promedio=>promedio.agnio)).sort()
      this.cohortesGraficoBarras = Array.from(new Set(this.detalleAsignaturaNuevo.promedios.cohortes.map(a => a.cohorte))).sort().map(cohorte => ({ label: cohorte.toString(), value: cohorte }))
      this.cohortesSeleccionadosGraficoBarras = [...this.cohortesGraficoBarras]
      this.cargarDatosNuevo()
    })
  }

  public detalleAsignatura: TendenciasCortePracticoDTO= {
    aprobaciones: {
                  general: [],
                  ingresoRegular: [],
                  ingresoProsecucion: [],
                  cohortes: []
                },
    asignatura: {
                codigo: '',
                idAsignatura: 0,
                posicion: 0
                },
    promedios: {
                general: [],
                ingresoRegular: [],
                ingresoProsecucion: [],
                cohortes: []
              }
  }
  public detalleAsignaturaNuevo: ReporteAsignaturaDTO= {
    asignaturas: {
      idAsignatura: 0,
      codigoAsignatura: '',
      nombreAsignatura: '',
      nombreCortoAsignatura: '',
      semestreRealizacion: 0,
      areaFormacion: '',
      planes: []
    },
    promedios: {
      general: [],
      cohortes: [],
      promediosPorPlan: []
    },
    aprobaciones: {
      general: [],
      cohortes: [],
      aprobacionesPorPlan: []
    }
  
  }
  public chartData: any
  public chartOptions: any
  public anioSeleccionado: number | "" = ""
  public anios: number[]=[]
  public idAsignatura: number=0
  public codigoAsignatura: string= ''
  public promedioGeneral: number=0
  public promediosPorPlan: {codigoPlan: number; promedio: number}[]=[]
  public promedioRegular: number=0
  public promedioProsecucion: number=0
  public aprobacionGeneral: number=0
  public aprobacionesPorPlan: {codigoPlan: number; aprobacion: number}[]=[]
  public aprobacionRegular: number=0
  public aprobacionProsecucion: number= 0
  public cohortesGraficoBarras: {label: string; value: number}[] = []
  public cohortesSeleccionadosGraficoBarras: {label: string; value: number}[] = []
  public cargando: boolean= true

  public cargarDatos(){
    this.cargando = true
    setTimeout(() => {
      this.cargando = false
    }, 1000)
    this.promedioGeneral= parseFloat((this.detalleAsignatura.promedios.general.map(promedio=>promedio.promedio).reduce((acc, promedio) => acc + promedio, 0) / this.detalleAsignatura.promedios.general.length).toFixed(2))
    this.promedioRegular= parseFloat((this.detalleAsignatura.promedios.ingresoRegular.map(promedio=>promedio.promedio).reduce((acc, promedio) => acc + promedio, 0) / this.detalleAsignatura.promedios.ingresoRegular.length).toFixed(2))
    this.promedioProsecucion= parseFloat((this.detalleAsignatura.promedios.ingresoProsecucion.map(promedio=>promedio.promedio).reduce((acc, promedio) => acc + promedio, 0) / this.detalleAsignatura.promedios.ingresoProsecucion.length).toFixed(2))
    this.aprobacionGeneral= parseFloat((this.detalleAsignatura.aprobaciones.general.map(aprobacion=>aprobacion.aprobacion).reduce((acc, aprobacion) => acc + aprobacion, 0) / this.detalleAsignatura.aprobaciones.general.length).toFixed(2))
    this.aprobacionRegular= parseFloat((this.detalleAsignatura.aprobaciones.ingresoRegular.map(aprobacion=>aprobacion.aprobacion).reduce((acc, aprobacion) => acc + aprobacion, 0) / this.detalleAsignatura.aprobaciones.ingresoRegular.length).toFixed(2))
    this.aprobacionProsecucion= parseFloat((this.detalleAsignatura.aprobaciones.ingresoProsecucion.map(aprobacion=>aprobacion.aprobacion).reduce((acc, aprobacion) => acc + aprobacion, 0) / this.detalleAsignatura.aprobaciones.ingresoProsecucion.length).toFixed(2))
    if(this.anioSeleccionado){
      this.detalleAsignatura.promedios.general.forEach(promedio=>{
        if(promedio.agnio===Number(this.anioSeleccionado)){
          this.promedioGeneral= promedio.promedio
        }
      })
      this.detalleAsignatura.promedios.ingresoRegular.forEach(promedio=>{
        if(promedio.agnio===Number(this.anioSeleccionado)){
          this.promedioRegular= promedio.promedio
        }
      })
      this.detalleAsignatura.promedios.ingresoProsecucion.forEach(promedio=>{
        if(promedio.agnio===Number(this.anioSeleccionado)){
          this.promedioProsecucion= promedio.promedio
        }
      })
      this.detalleAsignatura.aprobaciones.general.forEach(aprobacion=>{
        if(aprobacion.agnio===Number(this.anioSeleccionado)){
          this.aprobacionGeneral=parseFloat(aprobacion.aprobacion.toFixed(2))
        }
      })
      this.detalleAsignatura.aprobaciones.ingresoRegular.forEach(aprobacion=>{
        if(aprobacion.agnio===Number(this.anioSeleccionado)){
          this.aprobacionRegular= parseFloat(aprobacion.aprobacion.toFixed(2))
        }
      })
      this.detalleAsignatura.aprobaciones.ingresoProsecucion.forEach(aprobacion=>{
        if(aprobacion.agnio===Number(this.anioSeleccionado)){
          this.aprobacionProsecucion= parseFloat(aprobacion.aprobacion.toFixed(2))
        }
      })
    }

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true, 
          labels: {
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
            text: 'Cohortes',
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

    this.chartData = this.filtrarGraficoBarra()
    this.cohortesSeleccionadosGraficoBarras.sort((a,b)=>a.value - b.value)
  }

  public cargarDatosNuevo() {
    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  
    if (this.anioSeleccionado) {
      const promedioAnio = this.detalleAsignaturaNuevo.promedios.general.filter((promedio) => promedio.agnio === Number(this.anioSeleccionado))
      if (promedioAnio.length > 0) {
        this.promedioGeneral = parseFloat(promedioAnio[0].promedio.toFixed(2))
      }
  
      const aprobacionAnio = this.detalleAsignaturaNuevo.aprobaciones.general.filter((aprobacion) => aprobacion.agnio === Number(this.anioSeleccionado))
      if (aprobacionAnio.length > 0) {
        this.aprobacionGeneral = parseFloat(aprobacionAnio[0].aprobacion.toFixed(2))
      }
  
      this.promediosPorPlan = this.detalleAsignaturaNuevo.promedios.promediosPorPlan.filter((plan) => plan.agnio === Number(this.anioSeleccionado)).map((plan) => ({
          codigoPlan: plan.codigoPlan,
          promedio: parseFloat(
            (
              this.detalleAsignaturaNuevo.promedios.promediosPorPlan.filter((p) => p.codigoPlan === plan.codigoPlan && p.agnio === Number(this.anioSeleccionado)).reduce((acc, p) => acc + p.promedio, 0) /
              this.detalleAsignaturaNuevo.promedios.promediosPorPlan.filter((p) => p.codigoPlan === plan.codigoPlan && p.agnio === Number(this.anioSeleccionado)).length
            ).toFixed(2)
          ),
        }))
  
      this.aprobacionesPorPlan = this.detalleAsignaturaNuevo.aprobaciones.aprobacionesPorPlan.filter((plan) => plan.agnio === Number(this.anioSeleccionado)).map((plan) => ({
          codigoPlan: plan.codigoPlan,
          aprobacion: parseFloat(
            (
              this.detalleAsignaturaNuevo.aprobaciones.aprobacionesPorPlan.filter((a) => a.codigoPlan === plan.codigoPlan && a.agnio === Number(this.anioSeleccionado)).reduce((acc, a) => acc + a.aprobacion, 0) /
              this.detalleAsignaturaNuevo.aprobaciones.aprobacionesPorPlan.filter((a) => a.codigoPlan === plan.codigoPlan && a.agnio === Number(this.anioSeleccionado)).length
            ).toFixed(2)
          ),
        }));
    } else {
      this.promedioGeneral = parseFloat(
        (
          this.detalleAsignaturaNuevo.promedios.general.map((promedio) => promedio.promedio).reduce((acc, promedio) => acc + promedio, 0) /
          this.detalleAsignaturaNuevo.promedios.general.length
        ).toFixed(2)
      )
  
      this.aprobacionGeneral = parseFloat(
        (
          this.detalleAsignaturaNuevo.aprobaciones.general.map((aprobacion) => aprobacion.aprobacion).reduce((acc, aprobacion) => acc + aprobacion, 0) /
          this.detalleAsignaturaNuevo.aprobaciones.general.length
        ).toFixed(2)
      )
  
      this.promediosPorPlan = this.detalleAsignaturaNuevo.promedios.promediosPorPlan.map((plan) => ({
        codigoPlan: plan.codigoPlan,
        promedio: parseFloat(
          (
            this.detalleAsignaturaNuevo.promedios.promediosPorPlan.filter((p) => p.codigoPlan === plan.codigoPlan).reduce((acc, p) => acc + p.promedio, 0) /
            this.detalleAsignaturaNuevo.promedios.promediosPorPlan.filter((p) => p.codigoPlan === plan.codigoPlan).length
          ).toFixed(2)
        ),
      }))
  
      this.aprobacionesPorPlan = this.detalleAsignaturaNuevo.aprobaciones.aprobacionesPorPlan.map((plan) => ({
        codigoPlan: plan.codigoPlan,
        aprobacion: parseFloat(
          (
            this.detalleAsignaturaNuevo.aprobaciones.aprobacionesPorPlan.filter((a) => a.codigoPlan === plan.codigoPlan).reduce((acc, a) => acc + a.aprobacion, 0) /
            this.detalleAsignaturaNuevo.aprobaciones.aprobacionesPorPlan.filter((p) => p.codigoPlan === plan.codigoPlan).length
          ).toFixed(2)
        ),
      }))
    }
  
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: {
            font: {
              size: 24,
            },
          },
        },
        datalabels: {
          display: true,
          color: 'white',
          align: 'center',
          font: {
            weight: 'bold',
            size: 16,
          },
          backgroundColor: 'black',
          borderRadius: 4,
          padding: 6,
          borderColor: 'white',
          borderWidth: 2,
        },
      },
      scales: {
        x: {
          grid: {
            color: '#e0e0e0',
          },
          ticks: {
            font: {
              size: 16,
            },
          },
          title: {
            display: true,
            text: 'Cohortes',
            font: {
              size: 24,
            },
          },
        },
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
            callback: function (value: number) {
              return value.toFixed(0);
            },
            font: {
              size: 16,
            },
            grid: {
              color: '#e0e0e0',
            },
          },
          title: {
            display: true,
            text: 'Porcentaje Aprobación',
            font: {
              size: 24,
            },
          },
        },
      },
      backgroundColor: '#ffffff',
    }
  
    this.chartData = this.filtrarGraficoBarraNuevo()
    this.cohortesSeleccionadosGraficoBarras.sort((a, b) => a.value - b.value)
  }

  public filtrarGraficoBarra() {
    const cohortesFiltrados = this.cohortesSeleccionadosGraficoBarras.map(c => c.value)
    const tipoIngresos = Array.from(new Set(this.detalleAsignatura.promedios.cohortes.map(c => c.tipoIngreso)))
    const labels = cohortesFiltrados.map((cohorte) => this.detalleAsignatura.aprobaciones.cohortes.find((a) => a.cohorte === cohorte)?.cohorte.toString() || '')
  
    const datasets = [
      {
        label: 'General',
        backgroundColor: this.getRandomColor(),
        data: cohortesFiltrados.map(cohorte => {
          const datosCohorte = this.detalleAsignatura.aprobaciones.cohortes.filter(c => c.cohorte === cohorte)
          return parseFloat((datosCohorte.reduce((acc, c) => acc + c.aprobacion, 0) / datosCohorte.length || 0).toFixed(2))
        }),
      },
    ]
  
    tipoIngresos.forEach((tipoIngreso, index) => {
      datasets.push({
        label: tipoIngreso,
        backgroundColor: this.getRandomColor(),
        data: cohortesFiltrados.map(cohorte => {
          const datosCohorte = this.detalleAsignatura.aprobaciones.cohortes.filter(c => c.cohorte === cohorte && c.tipoIngreso === tipoIngreso)
          return parseFloat((datosCohorte.reduce((acc, c) => acc + c.aprobacion, 0) / datosCohorte.length || 0).toFixed(2))
        }),
      })
    })

    datasets.map(a=>a.data.sort())
    labels.sort()
  
    return {labels, datasets}
  }

  public filtrarGraficoBarraNuevo() {
    const cohortesFiltrados = this.cohortesSeleccionadosGraficoBarras.map(c => c.value)
    const tipoIngresos = Array.from(new Set(this.detalleAsignaturaNuevo.promedios.cohortes.map(c => c.plan)))
    const labels = cohortesFiltrados.map((cohorte) => this.detalleAsignaturaNuevo.aprobaciones.cohortes.find((a) => a.cohorte === cohorte)?.cohorte.toString() || '')
  
    const datasets = [
      {
        label: 'General',
        backgroundColor: this.getRandomColor(),
        data: cohortesFiltrados.map(cohorte => {
          const datosCohorte = this.detalleAsignaturaNuevo.aprobaciones.cohortes.filter(c => c.cohorte === cohorte)
          return parseFloat((datosCohorte.reduce((acc, c) => acc + c.aprobacion, 0) / datosCohorte.length || 0).toFixed(2))
        }),
      },
    ]
  
    tipoIngresos.forEach((plan, index) => {
      datasets.push({
        label: plan,
        backgroundColor: this.getRandomColor(),
        data: cohortesFiltrados.map(cohorte => {
          const datosCohorte = this.detalleAsignaturaNuevo.aprobaciones.cohortes.filter(c => c.cohorte === cohorte && c.plan === plan)
          return parseFloat((datosCohorte.reduce((acc, c) => acc + c.aprobacion, 0) / datosCohorte.length || 0).toFixed(2))
        }),
      })
    })

    datasets.map(a=>a.data.sort())
    labels.sort()
  
    return {labels, datasets}
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  public devolverAAsignaturas() {
    this.router.navigateByUrl('/asignaturas')
  }
}
