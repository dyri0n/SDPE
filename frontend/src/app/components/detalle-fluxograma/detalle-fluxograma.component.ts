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
    //obtenemos la id del fluxograma a traves de la ruta
    this.idFluxograma = +this.route.snapshot.paramMap.get('idFluxograma')!
    //llamamos a la funcion para obtener el detalle del fluxograma
    this.obtenerDetalleFluxograma()
    this.obtenerLineas()
  }

  @ViewChild('menu') contextMenu!: ContextMenu; // referencia al menu
  lineaMenu!: MenuItem[]; 
  private lastContextMenu!: ContextMenu;
  public selectedAsignaturaId!: number;

  //variable para guardar el detalle de un fluxograma
  public detalleFluxograma: AsignaturaFluxograma[]=[]
  //variable para guardar el id del fluxograma
  public idFluxograma: number = 0
  //variable para guardar la informacion general del fluxograma
  public fluxograma: Fluxograma={
    idPlan:0,
    agnio:0,
    codigo: 0,
    fechaInstauracion: new Date(),
    titulo: ''
  }
  //variable para guardar los semestres
  public semestres: string[] = []
  //variable para guardar los prerequisitos
  public asignaturasPrevias: number[] = []
  //variable para guardar las tributaciones
  public asignaturasTributadas: number[] = []

  //esta funcion guarda las asignaturas previas y las que tributa una asignatura cuando se le pone el mouse encima
  public resaltarAsignaturas(previas: number[],tributa: number[]): void {
    this.asignaturasPrevias = previas
    this.asignaturasTributadas = tributa
  }

  //esta funcion vacia el arreglo de asignatuaras previas y de tributacion cuando se quita el mouse de una asignatura
  public quitarResaltado(): void {
    this.asignaturasPrevias = []
    this.asignaturasTributadas = []
  }

  //esta funcion comprueba si la asignatura que se esta revisando es requisito para la asignatura en la que este el mouse encima, 
  //devolviendo un boolean para cambiar el color de la asignatura a rojo
  public esPrevia(id: number): boolean {
    return this.asignaturasPrevias.includes(id)
  }

  //esta funcion comprueba si la asignatura que se esta revisando es una tributacion para la asignatura en la que este el mouse encima, 
  //devolviendo un boolean para cambiar el color de la asignatura a verde
  public esTributada(id: number): boolean {
    return this.asignaturasTributadas.includes(id)
  }

  //esta funcion comprueba si la asignatura que se esta revisando es de caracter practico devolviendo un bolean para cambiar el color a celeste
  public esCortePracticoNuevo(caracter: string): boolean {
    return caracter === 'PRACTICA'
  }

  //esta funcion permite verificar que la asignatura en la cual damos click este en detalle fluxograma y segun su caracter manda a ver las estadisticas o la aprobacion de esta
  public detalleAsignatura(idAsignatura: number, codigoAsignatura: string) {
    this.detalleFluxograma.forEach((asignatura) => {
      if (asignatura.idAsignatura === idAsignatura) {
        if (asignatura.caracter === 'PRACTICA') {
          this.router.navigate(['/estadisticas/', this.idFluxograma, codigoAsignatura])
        } else {
          this.router.navigate(['/aprobacion/', this.idFluxograma, codigoAsignatura])
        }
      }
    })
  }

  //esta funcion sirve para poner numeros romanos en los semestres ingresando el numero del semestre
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

  //esta funcion sirve para obtener el detalle del fluxograma donde iran todas las asignaturas y tambien crearemos los semestres
  public obtenerDetalleFluxograma() {
    //aqui obtenemos el detalle del fluxograma con su id
    this.servicioFluxograma.obtenerDetalleFluxograma(this.idFluxograma).subscribe((detalleFluxograma) => {
        let semestres = 0
        this.detalleFluxograma = detalleFluxograma
        //aqui recorremos las asignaturas buscando el semestre mas alto para guardarlo
        detalleFluxograma.forEach((asignatura) => {
          if (asignatura.semestre > semestres) {
            semestres = asignatura.semestre
          }
        })
        //aqui con el semestre mas alto creamos el arreglo de semestres en romano para los titulos
        this.semestres = this.obtenerSemestres(semestres)
      })
    //aqui vamos a buscar el fluxograma para mostrar informacion de este, su titulo y año
    this.servicioFluxograma.obtenerFluxogramaPorID(this.idFluxograma).subscribe((fluxograma) => {
      this.fluxograma = fluxograma
    })
  }

  //esta funcion devuelve a la vista de fluxogramas
  public devolverAListarFluxogramas() {
    this.router.navigateByUrl('/fluxogramas')
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
