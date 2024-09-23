import { Component, OnInit } from '@angular/core';
import { FluxogramaService } from '../../services/Fluxograma.service';
import { Fluxograma } from '../../models/Fluxograma.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-fluxogramas',
  templateUrl: './fluxogramas.component.html',
  styleUrls: ['./fluxogramas.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FluxogramasComponent implements OnInit {

  constructor(
    private fluxogramaService: FluxogramaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarFluxogramas()
  }

  fluxogramas: Fluxograma[] = []

  public cargarFluxogramas(): void {
    this.fluxogramaService.obtenerFluxogramas().subscribe((fluxogramas) => {
      this.fluxogramas = fluxogramas
    })
  }

  public escogerPlan(id: number): void {
    this.router.navigate(['/detalleFluxograma', id])
  }
}
