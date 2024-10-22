import { Component } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { CommonModule } from '@angular/common';
import { DetallesPracticaDTO } from '../../models/practica';
import { AccordionModule } from 'primeng/accordion';
import { InfoPracticaDTO } from '../../models/practica';
@Component({
  selector: 'app-practicas-estudiante',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  templateUrl: './practicas-estudiante.component.html',
  styleUrl: './practicas-estudiante.component.css',
})
export class PracticasEstudianteComponent {
  // Fixme : Cambiar por id pasada por la vista anterior
  id_estudiante: number = 1;
  practicas_estudiante: DetallesPracticaDTO = new DetallesPracticaDTO();
  tiposPracticas: Practicass[] = [];
  constructor(private readonly alumnoService: AlumnoService) {}

  // Antes que se carge el componente
  ngOnInit() {
    this.alumnoService
      .getPracticasAlumno(this.id_estudiante)
      .subscribe((request) => {
        this.practicas_estudiante = request;
      });

    this.tiposPracticas = this.getMatrizDePracticas();
    console.log(this.tiposPracticas);
  }

  getMatrizDePracticas() {
    let tipoPractica: Practicass[] = [];
    this.practicas_estudiante.practicas.forEach((practica) => {
      let practicasTipo: Practicass = {
        practicas: [],
        tipoPractica: practica.posicionRelativa,
      };
      this.practicas_estudiante.practicas.forEach((p) => {
        if (p.posicionRelativa === practicasTipo.tipoPractica) {
          practicasTipo.practicas.push(p);
        }
      });
      tipoPractica.push(practicasTipo);
    });
    return tipoPractica;
  }
}
interface Practicass {
  tipoPractica: number;
  practicas: InfoPracticaDTO[];
}
