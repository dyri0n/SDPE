import { Component, OnInit } from '@angular/core';
import { FluxogramaService } from '../../services/fluxograma.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaFluxograma } from '../../models/asignatura.dto';
import { Fluxograma } from '../../models/Fluxograma.model';

@Component({
  selector: 'app-detalle-fluxograma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-fluxograma.component.html',
  styleUrl: './detalle-fluxograma.component.css',
})
export class DetalleFluxogramaComponent implements OnInit {
  constructor(
    private servicioFluxograma: FluxogramaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idFluxograma = +this.route.snapshot.paramMap.get('idFluxograma')!;
    this.obtenerFluxograma();
  }

  detalleFluxograma?: AsignaturaFluxograma[];
  public idFluxograma: number = 0;
  fluxograma?: Fluxograma;

  semestres: string[] = [];

  asignaturasPrevias: number[] = [];
  asignaturasTributadas: number[] = [];

  public resaltarAsignaturas(
    previas: { idAsignaturaTributada: number }[],
    tributa: { idAsignaturaRequerida: number }[]
  ): void {
    this.asignaturasPrevias = previas.map(
      (asignatura) => asignatura.idAsignaturaTributada
    );
    this.asignaturasTributadas = tributa.map(
      (asignatura) => asignatura.idAsignaturaRequerida
    );
  }

  public quitarResaltado(): void {
    this.asignaturasPrevias = [];
    this.asignaturasTributadas = [];
  }

  public esPrevia(id: number): boolean {
    return this.asignaturasPrevias.includes(id);
  }

  public esTributada(id: number): boolean {
    return this.asignaturasTributadas.includes(id);
  }

  public esCortePractico(asignatura: AsignaturaFluxograma): boolean {
    return asignatura.caracter === 'PRACTICA';
  }

  public detalleAsignatura(
    idAsignatura: number,
    nombreAsignatura: string,
    previas: { idAsignaturaTributada: number }[],
    tributa: { idAsignaturaRequerida: number }[]
  ) {
    this.detalleFluxograma!.forEach((asignatura) => {
      if (asignatura.idAsignatura === idAsignatura) {
        if (asignatura.caracter === 'PRACTICA') {
          this.router.navigate(['/estadisticas/', idAsignatura]);
        } else {
          this.router.navigate(['/cursos/', idAsignatura]);
        }
      }
    });
  }

  public obtenerSemestres(n: number): string[] {
    const numerosRomanos: string[] = [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
      'XI',
      'XII',
    ];
    return numerosRomanos.slice(0, n);
  }

  public obtenerFluxograma() {
    this.servicioFluxograma
      .obtenerDetalleFluxograma(this.idFluxograma)
      .subscribe((detalleFluxograma) => {
        let semestres = 0;
        this.detalleFluxograma = detalleFluxograma;
        detalleFluxograma.forEach((asignatura) => {
          if (asignatura.semestre > semestres) {
            semestres = asignatura.semestre;
          }
        });
        this.semestres = this.obtenerSemestres(semestres);
      });
    this.servicioFluxograma
      .obtenerFluxogramaPorID(this.idFluxograma)
      .subscribe((fluxograma) => {
        this.fluxograma = fluxograma;
      });
  }
}
