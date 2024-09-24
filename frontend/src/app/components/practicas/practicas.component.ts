import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PracticasService } from '../../services/practicas.service';
import { Practica } from '../../models/practica';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './practicas.component.html',
  styleUrl: './practicas.component.css',
})
export class PracticasComponent {
  buscador: String = '';
  practicas: Practica[] = [] as Practica[];

  constructor(private readonly practicaService: PracticasService) {}

  ngOnInit() {
    this.practicas = this.practicaService.obtenerPracticas();
  }

  filteredPracticas() {
    if (!this.buscador) {
      return this.practicas;
    }

    const term = this.buscador.toLowerCase();
    return this.practicas.filter(
      (p) =>
        p.titulo.toLowerCase().includes(term) ||
        p.nombreEstudiante.toLowerCase().includes(term) ||
        p.nombreProfe.toLowerCase().includes(term) ||
        `${p.fecha.getDate()}/${
          p.fecha.getMonth() + 1
        }/${p.fecha.getFullYear()}`.includes(term)
    );
  }
}
