import { Component, OnInit, ViewChild } from '@angular/core';
import { FluxogramaService } from '../../services/fluxograma.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaFluxograma } from '../../models/asignatura.dto';
import { Fluxograma } from '../../models/Fluxograma.model';
import { AsignaturaService } from '../../services/asignatura.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { LineaPlan } from '../../models/lineaAsignatura.dto';


@Component({
  selector: 'app-detalle-fluxograma',
  standalone: true,
  imports: [CommonModule, ContextMenuModule, ToastModule],
  providers: [MessageService],
  templateUrl: './detalle-fluxograma.component.html',
  styleUrl: './detalle-fluxograma.component.css',
})
export class DetalleFluxogramaComponent implements OnInit {
  constructor(
    private servicioFluxograma: FluxogramaService,
    private route: ActivatedRoute,
    private router: Router,
    private asignaturaService: AsignaturaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.idFluxograma = +this.route.snapshot.paramMap.get('idFluxograma')!;
    this.obtenerFluxograma();
    this.obtenerLineas()
  }

  @ViewChild('menu') contextMenu!: ContextMenu; // referencia al menu
  lineaMenu!: MenuItem[]; 
  private lastContextMenu!: ContextMenu;
  public selectedAsignaturaId!: number;

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

  public obtenerLineas() {
    this.asignaturaService.obtenerLineasPlan(this.idFluxograma).subscribe((result: LineaPlan) => {
      const lineas = result.lineasAsignatura.map((linea: any) => ({
        label: "Línea de " + linea.titulo,
        icon: 'pi pi-plus',
        command: () => this.agregarALinea(linea.idLinea)
      }));
  
      this.lineaMenu = [
        {
          label: 'Agregar a línea de asignaturas',
          icon: 'pi pi-list',
          items: lineas,
          styleClass: 'text-sm'
        },
      ];
      console.log(this.lineaMenu);
    });
  }
  
  public agregarALinea(lineaId: number) {
    if (this.selectedAsignaturaId) {
      console.log(
        `Asignatura ID ${this.selectedAsignaturaId} agregada a la línea ID ${lineaId}`
      );

      this.asignaturaService.agregarAsignaturaLinea(this.selectedAsignaturaId, lineaId).subscribe({
          next: (response: any) => {
            this.messageService.add({
              severity: 'success', 
              summary: 'Agregada', 
              detail: `Asignatura agregada correctamente`
            });
            console.log(':', response);
          },
          error: (error: any) => {
            this.messageService.add({
              severity: 'error', 
              summary: 'Error', 
              detail: `Error al agregar asignatura a la línea: ${error.message}`
            });
          },
        });
    }
  }

  public onContextMenuOpen(menu: ContextMenu, asignaturaId: number) {
    this.selectedAsignaturaId = asignaturaId;

    if (this.lastContextMenu && this.lastContextMenu !== menu) {
      this.lastContextMenu.hide();
    }
    this.lastContextMenu = menu;

    console.log('asignatura seleccionada:', this.selectedAsignaturaId);
  }

  onScroll() {
    if (this.lastContextMenu?.container) {
      this.lastContextMenu.hide();
    }
  }

  public gestionarLinea(){
    this.router.navigateByUrl(`gestionar-lineas/${this.idFluxograma}`)
  }

}
