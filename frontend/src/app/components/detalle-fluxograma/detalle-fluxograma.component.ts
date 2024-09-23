import { Component, OnInit } from '@angular/core';
import { FluxogramaService } from '../../services/fluxograma.service';
import { DetalleFluxograma } from '../../models/detalleFluxograma.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-fluxograma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-fluxograma.component.html',
  styleUrl: './detalle-fluxograma.component.css'
})
export class DetalleFluxogramaComponent implements OnInit{

  constructor(
    private servicioFluxograma: FluxogramaService
  ) {}

  ngOnInit() {
    this.obtenerFluxograma()
  }

  detalleFluxograma?: DetalleFluxograma
  semestres: string[] = []

  asignaturasPrevias: number[] = [];
  asignaturasTributadas: number[] = [];

  public resaltarAsignaturas(previas: number[], tributa: number[]): void {
    this.asignaturasPrevias = previas; 
    this.asignaturasTributadas = tributa;
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

  public detalleAsignatura(idAsignatura: number, nombreAsignatura:string, previas:number[], tributa:number[]){
    alert(`ID de asignatura: ${idAsignatura}, nombre:  ${nombreAsignatura}, asignaturas previas: ${previas}, tributa: ${tributa}`);
  }

  public obtenerSemestres(n: number): string[] {
    const numerosRomanos: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return numerosRomanos.slice(0, n);
  }

  public obtenerFluxograma(){
    this.servicioFluxograma.obtenerDetalleFluxograma().subscribe((fluxograma) => {
      this.detalleFluxograma = fluxograma
      this.semestres = this.obtenerSemestres(fluxograma.semestres)
    })
  }

}
