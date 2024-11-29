import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { AsignaturaSola } from '../../models/asignaturaSola.dto';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../services/Cursos.service';
import { AprobacionCursoDTO, AprobacionCursoDTONuevo } from '../../models/Curso.dto';
import { AsignaturaDetalleDTO, AsignaturaFluxogramaNuevo } from '../../models/asignatura.dto';


Chart.register(ChartDataLabels);

@Component({
  selector: 'app-aprobacion-curso',
  standalone: true,
  imports: [CommonModule, ChartModule, FormsModule],
  templateUrl: './aprobacion-curso.component.html',
  styleUrl: './aprobacion-curso.component.css',
})
export class AprobacionCursoComponent {
  constructor(
    private route: ActivatedRoute,
    private diagnosticosService: DiagnosticosService,
    private cursosService: CursosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idFluxograma = +this.route.snapshot.paramMap.get('idFluxograma')!
    this.codigoAsignatura = this.route.snapshot.paramMap.get('codigoAsignatura')!;
    /*this.obtenerNombreAsignatura();
    this.cargarDatos()*/
    this.obtenerNombreAsignaturaNuevo()
    this.cargarDatosNuevo()
  }

  public idAsignatura: number=0
  public codigoAsignatura: string = '';
  public idFluxograma: number = 0
  public asignatura?: AsignaturaSola;
  public asignaturaNueva?: AsignaturaDetalleDTO;
  public cohortesData: AprobacionCursoDTO[]=[]
  public cohortesDataNuevo: AprobacionCursoDTONuevo[]=[]
  public cohortesUnicos: number[]=[]
  public chartData: any
  public cohorteSeleccionado: number | 'todos' = 'todos'
  public regData: any
  public proData: any
  public graficos: any[] = []
  public anioSeleccionado: number | "todos"="todos"
  public anios: number[]=[]
  public cargando: boolean= true
  public options: any = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          font: {
            weight: 'bold',
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`
          },
        },
      },
      datalabels: {
        color: 'white',
        formatter: (value: number) => {
          return `${value}%`
        },
        font: {
          weight: 'bold',
          size: 16,
        },
        anchor: 'center',
        align: 'center',
      },
    },
    legend: {
      position: 'top',
      labels: {
        boxWidth: 20,
      },
    },
  }

  public obtenerNombreAsignatura() {
    this.diagnosticosService
      .obtenerNombreAsignatura(this.idAsignatura)
      .subscribe((asignatura) => {
        this.asignatura = asignatura;
      });
  }

  public cargarDatos() {
    this.cursosService.aprobacionPorCurso(this.idAsignatura).subscribe((respuesta) => {
      console.log(respuesta)
      this.cohortesData = respuesta
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      this.cohortesUnicos = [...new Set(respuesta.map((item) => item.cohorte))]
      this.anios = [...new Set(respuesta.map((item) => item.agnio))]

      let cursosFiltrados: AprobacionCursoDTO[] = []
  
      if (this.cohorteSeleccionado === 'todos'){
        if(this.anioSeleccionado === 'todos'){
          cursosFiltrados= this.cohortesData
        }else{
          cursosFiltrados = this.cohortesData.filter(cohorte=>cohorte.agnio===Number(this.anioSeleccionado))
        }
      }else{
        if(this.anioSeleccionado === 'todos'){
          cursosFiltrados = this.cohortesData.filter((cohortes) => cohortes.cohorte === Number(this.cohorteSeleccionado))
        }else{
          cursosFiltrados = this.cohortesData.filter((cohortes) => cohortes.cohorte === Number(this.cohorteSeleccionado) && cohortes.agnio === Number(this.anioSeleccionado))
        }
      }
  
      if (cursosFiltrados.length > 0) {
        this.graficos = cursosFiltrados.reduce((acc: any[], curso) => {
          const index = acc.findIndex(
            (item) => item.tipoIngreso === curso.tipoIngreso
          )
  
          if (index === -1) {
            acc.push({
              tipoIngreso: curso.tipoIngreso,
              totalAprobacion: curso.aprobacion,
              totalCursos: 1,
            })
          } else {
            acc[index].totalAprobacion += curso.aprobacion
            acc[index].totalCursos++
          }
          return acc
        }, [])
        .map((item) => {
          const aprobacionPromedio = Math.round(item.totalAprobacion / item.totalCursos)
          const reprobacionPromedio = Math.round(100 - aprobacionPromedio)
  
          return {
            tipoIngreso: item.tipoIngreso,
            data: {
              labels: ['Aprobación', 'Reprobación'],
              datasets: [
                {
                  data: [aprobacionPromedio, reprobacionPromedio],
                  backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                  ],
                },
              ],
            },
          }
        })
      }
    })
  }

  public obtenerNombreAsignaturaNuevo() {
    this.diagnosticosService
      .obtenerNombreAsignaturaNuevo(this.codigoAsignatura)
      .subscribe((asignaturas) => {
        this.asignaturaNueva = asignaturas
      });
  }

  public cargarDatosNuevo() {
    this.cursosService.aprobacionPorCursoNuevo(this.codigoAsignatura).subscribe((respuesta) => {
      this.cohortesDataNuevo = respuesta
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      this.cohortesUnicos = [...new Set(respuesta.map((item) => item.cohorte))]
      this.anios = [...new Set(respuesta.map((item) => item.agnio))]

      let cursosFiltrados: AprobacionCursoDTONuevo[] = []
  
      if (this.cohorteSeleccionado === 'todos'){
        if(this.anioSeleccionado === 'todos'){
          cursosFiltrados= this.cohortesDataNuevo
        }else{
          cursosFiltrados = this.cohortesDataNuevo.filter(cohorte=>cohorte.agnio===Number(this.anioSeleccionado))
        }
      }else{
        if(this.anioSeleccionado === 'todos'){
          cursosFiltrados = this.cohortesDataNuevo.filter((cohortes) => cohortes.cohorte === Number(this.cohorteSeleccionado))
        }else{
          cursosFiltrados = this.cohortesDataNuevo.filter((cohortes) => cohortes.cohorte === Number(this.cohorteSeleccionado) && cohortes.agnio === Number(this.anioSeleccionado))
        }
      }

      if (cursosFiltrados.length > 0) {
        this.graficos = cursosFiltrados.reduce((acc: any[], curso) => {
          const index = acc.findIndex(
            (item) => item.plan === curso.plan
          )
  
          if (index === -1) {
            acc.push({
              plan: curso.plan,
              totalAprobacion: curso.aprobacion,
              totalCursos: 1,
            })
          } else {
            acc[index].totalAprobacion += curso.aprobacion
            acc[index].totalCursos++
          }
          return acc
        }, [])
        .map((item) => {
          const aprobacionPromedio = Math.round(item.totalAprobacion / item.totalCursos)
          const reprobacionPromedio = Math.round(100 - aprobacionPromedio)
  
          return {
            plan: item.plan,
            data: {
              labels: ['Aprobación', 'Reprobación'],
              datasets: [
                {
                  data: [aprobacionPromedio, reprobacionPromedio],
                  backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                  ],
                },
              ],
            },
          }
        })
      }
    })
  }

  public devolverAListarCursos() {
    this.router.navigate(['/fluxograma',this.idFluxograma])
  }
}
