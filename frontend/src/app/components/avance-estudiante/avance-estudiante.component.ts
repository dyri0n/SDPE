import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { AlumnoAvance } from '../../models/alumno-avance';
import { AlumnoService } from '../../services/alumno.service';
import { CursoRealizado } from '../../models/curso_realizado';
import { ScrollerModule } from 'primeng/scroller';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

Chart.register(ChartDataLabels);
@Component({
  selector: 'app-avance-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    DividerModule,
    ScrollerModule,
    FormsModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './avance-estudiante.component.html',
  styleUrl: './avance-estudiante.component.css',
})
export class AvanceEstudianteComponent {
  /**
   * Esta vista presenta la informacion de avance estudiantil de un estudiante en especifico
   *
   * Se llama al servicio AlumnoService para que pueda inyectar el servicio con la
   * informacion recibida del backend.
   *
   * Se debe obtener el @param alumnoId para poder acceder a esta vista
   */

  avanceEstudiante: AlumnoAvance = new AlumnoAvance();
  cursosBuscados: CursoRealizado[] = [];
  entradaBuscador: string = '';
  data: any;
  options: any;
  nombreEstudiante: string = '';
  rutEstudiante: string = '';

  constructor(
    private readonly alumnoService: AlumnoService,
    private router: Router
  ) {}

  ngOnInit() {
    // antes de cargar el componente se comprueba los valores obtenidos de la ruta
    this.nombreEstudiante = history.state.nombreCompleto;
    this.rutEstudiante = history.state.rut;
    // si no estan se envia a la ruta anterior (listar-estudiantes)
    if (!this.nombreEstudiante && this.rutEstudiante) {
      this.router.navigate(['/listar-estudiantes']);
    }
    // Se obtienen los datos del servicio
    this.alumnoService.getAvanceEstudiante(this.rutEstudiante).subscribe(
      (avance) => {
        this.avanceEstudiante = avance;
        console.log(this.avanceEstudiante);

        this.setData();
        console.log('data => ', this.data);
      },
      (error) => {
        console.error('Error al obtener los datos del estudiante', error);
      }
    );
  }

  public filtrarCursos() {
    if (!this.entradaBuscador) {
      return this.avanceEstudiante.cursosRealizados;
    }
    const str = this.entradaBuscador.toLowerCase();
    return this.avanceEstudiante.cursosRealizados.filter(
      (curso) =>
        curso.nombreAsignatura.toLowerCase().includes(str) ||
        curso.codigo.toLowerCase().includes(str)
    );
  }

  public setData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    console.log('AVANCE ESTUDIANTE', this.avanceEstudiante);

    let semestres_individual: String[] =
      this.avanceEstudiante.avanceIndividual.map(
        (sem) => `Semestre ${sem.numSemestre + 1}`
      );
    let promedios_individual: String[] =
      this.avanceEstudiante.avanceIndividual.map((sem) =>
        // Para redondear el promedio
        sem.promedio.toFixed(1)
      );
    let promedios_cohorte: String[] = this.avanceEstudiante.avanceCohorte.map(
      (sem) => sem.promedio.toFixed(1)
    );

    this.data = {
      labels: semestres_individual,
      datasets: [
        {
          label: 'Avance individual',
          fill: '1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          pointRadius: 4,
          pointHoverRadius: 4,
          yAxisID: 'y',
          tension: 0.2,
          data: promedios_individual,
          pointBorderColor: documentStyle.getPropertyValue('--blue-500'),
          pointBackgroundColor: documentStyle.getPropertyValue('--blue-500'),
          datalabels: {
            color: documentStyle.getPropertyValue('--blue-500'),
            align: 'top',
            offset: 20,
            font: {
              size: 15,
            },
          },
        },
        {
          label: `Avance por cohorte ${this.avanceEstudiante.estudiante.agnioIngreso}`,
          fill: '-1',
          borderColor: '#DC911A',
          pointRadius: 4,
          pointHoverRadius: 4,
          yAxisID: 'y',
          tension: 0.2,
          data: promedios_cohorte,
          pointBorderColor: '#DC911A',
          pointBackgroundColor: '#DC911A',
          datalabels: {
            color: '#DC911A',
            align: 'bottom',
            offset: 20,
            font: {
              size: 15,
            },
          },
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 12,
              weight: 'bold',
            },
          },
        },
        tooltip: {
          enabled: true,
          mode: 'index',
        },
        datalabels: {
          display: true,
        },
        title: {
          display: true,
          text: 'Avance Estudiantil por Semestre',
          font: {
            size: 18,
            weight: 'bold',
          },
          color: textColor,
          padding: {
            bottom: 10,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: {
              size: 12,
            },
          },
          grid: {
            color: surfaceBorder,
          },
          title: {
            display: true,
            text: 'Semestres',
            color: textColor,
            font: {
              size: 16,
            },
          },
        },
        y: {
          ticks: {
            color: textColor,
            font: {
              size: 18,
            },
          },
          grid: {
            color: surfaceBorder,
          },
          min: 1,
          max: 7,
          title: {
            display: true,
            text: 'Promedio',
            color: textColor,
            font: {
              size: 16,
            },
          },
        },
      },
    };
  }

  public devolverAMenuEstudiante() {
    const routerDataState = {
      rut: this.rutEstudiante,
      nombreCompleto: this.nombreEstudiante,
    };

    this.router.navigateByUrl('/menu-estudiante', { state: routerDataState });
  }
}
