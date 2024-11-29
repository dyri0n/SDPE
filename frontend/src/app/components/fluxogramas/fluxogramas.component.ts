import { Component, OnInit } from '@angular/core';
import { Fluxograma, FluxogramaNuevo } from '../../models/Fluxograma.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FluxogramaService } from '../../services/fluxograma.service';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-fluxogramas',
  templateUrl: './fluxogramas.component.html',
  styleUrls: ['./fluxogramas.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, CardModule]
})
export class FluxogramasComponent implements OnInit {
  constructor(
    private fluxogramaService: FluxogramaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarFluxogramas();
  }

  public fluxogramas: Fluxograma[] = [];
  public fluxogramasNuevo: FluxogramaNuevo[] = [];
  public cargando = true
  public timeout: any

  public cargarFluxogramas(): void {
    this.fluxogramaService.obtenerFluxogramas().subscribe((fluxogramas) => {
      this.fluxogramas = fluxogramas
    });
    this.fluxogramaService.obtenerFluxogramasNuevo().subscribe((fluxogramas) => {
      this.fluxogramasNuevo = fluxogramas
      console.log(this.fluxogramasNuevo)
    });
    this.timeout = setTimeout(() => {this.cargando = false}, 1000)
  }

  public escogerPlan(id: number): void {
    this.router.navigate(['/fluxograma/', id]);
  }
  
  public devolverAlMenu() {
    this.router.navigateByUrl('/menu')
  }
}
