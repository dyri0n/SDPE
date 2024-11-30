import { Component } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { CommonModule, Location } from '@angular/common';
import { DetallesPracticaDTO } from '../../models/practica';
import { AccordionModule } from 'primeng/accordion';
import { InfoPracticaDTO } from '../../models/practica';
import { ActivatedRoute, Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-practicas-estudiante',
  standalone: true,
  imports: [CommonModule, AccordionModule, SkeletonModule, PaginatorModule],
  templateUrl: './practicas-estudiante.component.html',
  styleUrl: './practicas-estudiante.component.css',
})
export class PracticasEstudianteComponent {
  id_estudiante: number = 0;
  practicas_estudiante: DetallesPracticaDTO = new DetallesPracticaDTO();
  nombreEstudiante: String = '';
  rutEstudiante: String = '';
  cargando: boolean = true;

  practicasPorPagina: number = 3;
  practicasTotales: number = 0;
  paginaActual: number = 1;

  constructor(
    private readonly alumnoService: AlumnoService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    // Se obtienen los parametros de la ruta
    this.obtenerParametrosDeLaRuta();
  }

  // Antes que se carge el componente
  ngOnInit() {
    this.alumnoService
      .getPracticasAlumno(this.id_estudiante.toString())
      .pipe(
        finalize(() => {
          this.cargando = false;
        })
      )
      .subscribe((request) => {
        this.practicas_estudiante = request;
      });
  }

  public devolverAMenuEstudiante() {
    this.location.back();
  }

  /**
   * Funcion que obtiene los parametros enviados de la vista anterior
   * La vista anterior enviar la siguiente ruta [practicas-estudiantes/:idEstudiante]
   */
  public obtenerParametrosDeLaRuta() {
    this.route.params.subscribe((param) => {
      this.id_estudiante = param['idEstudiante'];
    });
  }

  public onCambioDePagina(evento: any) {
    this.paginaActual = evento.page + 1;
    this.practicasPorPagina = evento.rows;
  }

  public obtenerPracticasPaginadas(): InfoPracticaDTO[] {
    const indiceInicial = (this.paginaActual - 1) * this.practicasPorPagina;
    const indiceFinal = indiceInicial + this.practicasPorPagina;
    const practicasPaginadas: InfoPracticaDTO[] =
      this.practicas_estudiante.practicas.slice(indiceInicial, indiceFinal);
    return practicasPaginadas;
  }

  public obtenerCantidadTotalPracticas() {
    return this.practicas_estudiante.practicas.length;
  }
}
interface Practicas {
  tipoPractica: number;
  practicas: InfoPracticaDTO[];
}
