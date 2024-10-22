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
  entradaBuscador: String = '';
  data: any;
  options: any;

  constructor(private readonly alumnoService: AlumnoService) {}

  ngOnInit() {
    // Se obtienen los datos del servicio
    this.alumnoService.getAvanceEstudiante(1).subscribe((avance) => {
      this.avanceEstudiante = avance;
    });
    this.setData();
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

    let semestres_individual: String[] =
      this.avanceEstudiante.avanceIndividual.map(
        (sem) => `Semestre ${sem.numSemestre + 1}`
      );
    let promedios_individual: String[] =
      this.avanceEstudiante.avanceIndividual.map((sem) =>
        // Para redonder el promedio
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
          yAxisID: 'y',
          tension: 0.2,
          data: promedios_individual,
        },
        {
          label: `Avance por cohorte ${this.avanceEstudiante.estudiante.agnioIngreso}`,
          fill: '-1',
          borderColor: documentStyle.getPropertyValue('--red-500'),
          yAxisID: 'y',
          tension: 0.2,
          data: promedios_cohorte,
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
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
