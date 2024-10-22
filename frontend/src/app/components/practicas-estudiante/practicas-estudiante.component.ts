import { Component } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { CommonModule } from '@angular/common';
import { DetallesPracticaDTO } from '../../models/practica';

@Component({
  selector: 'app-practicas-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practicas-estudiante.component.html',
  styleUrl: './practicas-estudiante.component.css',
})
export class PracticasEstudianteComponent {
  // Fixme : Cambiar por id pasada por la vista anterior
  id_estudiante: number = 1;
  practicas_estudiante: DetallesPracticaDTO = new DetallesPracticaDTO();

  constructor(private readonly alumnoService: AlumnoService) {}

  // Antes que se carge el componente
  ngOnInit() {
    this.alumnoService
      .getPracticasAlumno(this.id_estudiante)
      .subscribe((request) => {
        this.practicas_estudiante = request;
      });
  }
}
