import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AsignaturaService } from '../../services/asignatura.service';
import { AsignaturaLinea, Linea, LineaActualizar, LineaCambios, LineaPlan } from '../../models/lineaAsignatura.dto';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-gestionar-lineas',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, DialogModule, FormsModule, ButtonModule, InputTextModule, FloatLabelModule, ReactiveFormsModule, ToastModule, ProgressSpinnerModule],
  providers: [MessageService],
  templateUrl: './gestionar-lineas.component.html',
  styleUrl: './gestionar-lineas.component.css'
})
export class GestionarLineasComponent implements OnInit {
  searchTermAsignaturas: string = '';
  searchTermLineas: string = '';

  asignaturas: AsignaturaLinea[] = []; 
  lineas: Linea[] = [];     
  asignaturasBackup: AsignaturaLinea[] = [];
  lineasBackup: Linea[] = [];     

  asignaturasEliminadas: AsignaturaLinea[] = []

  hayCambios: boolean = false;
  display: boolean = false;
  editando: boolean = false;
  idLineaSeleccioanda!: number

  idPlan!: number;

  cargando: boolean = true;

  mostrarModalParaEditar(linea: any) {
    this.editando = true;
    this.display = true;
    this.idLineaSeleccioanda = linea.id

    // cargar datos en el formulario
    this.formularioLinea.patchValue({
      nombre: linea.nombre,
      color: linea.color,
    });
  }

  mostrarModalParaAgregar() {
    this.editando = false;
    this.display = true;

    // reiniciar el formulario
    this.formularioLinea.reset({ color: '#ffffff' });
  }

  
  public eliminarLinea(idLinea: number){
    //esta hecho para funcionar con el delete al backend, no pienso cambiarlo 🤬
    this.servicioAsignatura.eliminarLinea(this.idPlan, idLinea).subscribe({
      next: respuesta =>{
        if(respuesta){
          Swal.fire(
            '¡Eliminado!',
            'La línea ha sido eliminada.',
            'success'
          )
          this.cargando = true
          this.cargarDatos()
          }
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al guardar los cambios: ${error.message}`,
        });
      }
    })
  }

  public confirmarEliminacion(idLinea: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.eliminarLinea(idLinea)
      }
    })
  }

  public formularioLinea: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    color: new FormControl('#ffffff', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioAsignatura: AsignaturaService,
    private messageService: MessageService
  ){ }

  ngOnInit(): void {
    this.idPlan= +this.route.snapshot.paramMap.get('idPlan')!
    this.cargarDatos()
  }
 
  public esconderModal() {
    this.display = false;
    this.formularioLinea.reset();
  }

  public guardarCambios() {
    if (this.editando) {
      this.editarLinea();
    } else {
      this.agregarLinea();
    }
  }

  public editarLinea(){
    if (this.formularioLinea.valid) {
      const lineaEditada = this.formularioLinea.value; 
      // buscar la linea por ID y actualizar sus datos
      const index = this.lineas.findIndex(linea => linea.id === this.idLineaSeleccioanda);
      if (index !== -1) {
        console.log(lineaEditada.color)
        console.log(this.lineas[index].color)
        console.log(lineaEditada.nombre)
        console.log(this.lineas[index].nombre)
        if(lineaEditada.color != this.lineas[index].color || lineaEditada.nombre != this.lineas[index].nombre) {
          this.lineas[index] = {
            ...this.lineas[index], // mantener otros datos
            color: lineaEditada.color,
            tituloNuevo: lineaEditada.nombre, // nuevo campo
          };
          console.log('linea actualizada:', this.lineas[index]);
          this.esconderModal();
          this.hayCambios = true
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `No se han detectado cambios en la línea`,
          });
        }
      }  
    }
  }

  public agregarLinea() {
    if (this.formularioLinea.valid) {
      const nuevaLinea: Linea = {
        nombre: this.formularioLinea.value.nombre,
        asignaturas: [],
        color: this.formularioLinea.value.color
      };
      this.lineas.push(nuevaLinea);
      this.esconderModal();
      this.detectarCambios();
      console.log(this.lineas)
    }
  }

  public quitarAsignatura(linea: any, asignatura: any): void {
    const index = linea.asignaturas.indexOf(asignatura);
    if (index !== -1) {
      linea.asignaturas.splice(index, 1);
      this.asignaturas.push(asignatura);
      this.asignaturasEliminadas.push(asignatura)
      this.detectarCambios(); 
    }
  }

  public cargarDatos(): void {
    this.servicioAsignatura.obtenerLineasPlan(this.idPlan).subscribe((lineas:LineaPlan) => {
      // guardar las lineas obtenidas
      console.log(lineas)
      this.lineas = lineas.lineasAsignatura.map((linea:any) => ({
        id: linea.idLinea,
        nombre: linea.titulo,
        asignaturas: [] as any[], // inicialmente vacio
        color: linea.color
      }));
    
      // obtener las asignaturas
      this.servicioAsignatura.obtenerListadoAsignaturas(this.idPlan).subscribe((asignaturasData) => {
        // procesar las asignaturas SIN LINEA
        this.asignaturas = asignaturasData["SIN LINEA"]?.map((asignatura: any) => ({
          titulo: asignatura.titulo,
          codigo: asignatura.codigo,
          nombre: asignatura.nombre,
          areaFormacion: asignatura.areaFormacion,
          idAsignatura: asignatura.idAsignatura,
        })) || [];
    
        // asociar las asignaturas con las lineas correspondientes
        Object.keys(asignaturasData).forEach((lineaNombre) => {
          if (lineaNombre === "SIN LINEA") return; // Ya procesamos SIN LINEA
    
          const asignaturas = asignaturasData[lineaNombre]?.map((asignatura: any) => ({
            titulo: asignatura.titulo,
            codigo: asignatura.codigo,
            nombre: asignatura.nombre,
            areaFormacion: asignatura.areaFormacion,
            idAsignatura: asignatura.idAsignatura,
          })) || [];
    
          // buscar la linea correspondiente por su nombre
          const lineaExistente = this.lineas.find(linea => linea.nombre === lineaNombre);
          if (lineaExistente) {
            lineaExistente.asignaturas.push(...asignaturas);
          }
        });
    
        // respaldar datos
        this.lineasBackup = JSON.parse(JSON.stringify(this.lineas));
        this.asignaturasBackup = JSON.parse(JSON.stringify(this.asignaturas));
    
        console.log("Asignaturas SIN LINEA:", this.asignaturas);
        console.log("Líneas con asignaturas:", this.lineas);
        this.cargando = false;
      });
    });
  }

  public soltar(event: CdkDragDrop<any[]>, linea?: Linea): void {
    if (linea) {
      const asignatura = event.previousContainer.data[event.previousIndex];
      if (event.previousContainer === event.container) {
        moveItemInArray(linea.asignaturas, event.previousIndex, event.currentIndex);
      } else {
        // saca la asignatura del listado general y la agrega a la linea
        const index = this.asignaturas.findIndex(a => a.idAsignatura === asignatura.idAsignatura);
        if (index !== -1) {
          this.asignaturas.splice(index, 1);
        }
        linea.asignaturas.push(asignatura);
      }
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    this.detectarCambios();
  }

  public compararAsignaturasSinOrden(asignaturas1: AsignaturaLinea[], asignaturas2: AsignaturaLinea[]): boolean {
    if (asignaturas1.length !== asignaturas2.length) {
      return false;
    }
    const asignaturas1Nombres = asignaturas1.map(asignatura => asignatura.nombre).sort();
    const asignaturas2Nombres = asignaturas2.map(asignatura => asignatura.nombre).sort();
    return asignaturas1Nombres.every((nombre, index) => nombre === asignaturas2Nombres[index]);
  }

  public detectarCambios(): void {
    const asignaturasIguales = this.compararAsignaturasSinOrden(this.asignaturas, this.asignaturasBackup);
    const lineasIguales = this.lineas.every((linea, index) => {
      const lineaBackup = this.lineasBackup[index];
      if (!lineaBackup) {
        return false;
      }
      return (
        linea.nombre === lineaBackup.nombre &&
        this.compararAsignaturasSinOrden(linea.asignaturas, lineaBackup.asignaturas)
      );
    });
    const lineasNuevasOEliminadas = this.lineas.length !== this.lineasBackup.length;
    this.hayCambios = !(asignaturasIguales && lineasIguales && !lineasNuevasOEliminadas);
    console.log('Cambios detectados', this.hayCambios);
  }

  public cancelarCambios(): void {
    this.asignaturas = JSON.parse(JSON.stringify(this.asignaturasBackup));
    this.lineas = JSON.parse(JSON.stringify(this.lineasBackup));
    this.asignaturasEliminadas = []
    this.detectarCambios();
  }

  public confirmarCambios(): void {

    const asignaturas: LineaActualizar[] = [
      ...this.lineas.map(linea => {
        if (linea.id) {
          console.log(linea)
          if (linea.tituloNuevo) { 
            return {
              codigosAsignaturas: linea.asignaturas.map(asignatura => asignatura.codigo!),
              tituloLineaRelacionada: linea.nombre,
              tituloNuevo: linea.tituloNuevo,
              colorNuevo: linea.color,
            };
          } else { 
            return {
              codigosAsignaturas: linea.asignaturas.map(asignatura => asignatura.codigo!),
              tituloLineaRelacionada: linea.nombre,
            };
          }
        } else { 
          return {
            codigosAsignaturas: linea.asignaturas.map(asignatura => asignatura.codigo!),
            tituloLineaRelacionada: linea.nombre,
            colorNuevo: linea.color,
          };
        }
      }).filter(linea => linea.codigosAsignaturas.length > 0),
      
      ...(this.asignaturasEliminadas.length > 0 ? 
        [{
          codigosAsignaturas: this.asignaturasEliminadas.map(asignatura => asignatura.codigo!),
        }] : []),
    ];

    const lineaNueva: LineaCambios ={
      lineasNuevas: asignaturas
    }

    this.cargando = true;
    this.servicioAsignatura.guardarCambios(this.idPlan,lineaNueva).subscribe({
    next: (response) => {
      this.lineasBackup = JSON.parse(JSON.stringify(this.lineas));
      this.asignaturasBackup = JSON.parse(JSON.stringify(this.asignaturas));
      this.hayCambios = false;
      this.asignaturasEliminadas= []
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: 'Cambios guardados con éxito',
      });
      console.log("RESPUESTA BACK",response);
      this.cargarDatos();
    },
    error: (error: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error al eliminar la línea: ${error.message}`,
      });
    },
  });
  }

  public volverFluxograma(){
    this.router.navigateByUrl(`fluxograma/${this.idPlan}`)
  }

  get asignaturasFiltradas(): AsignaturaLinea[] {
    if (!this.searchTermAsignaturas) {
      return this.asignaturas;
    }
    return this.asignaturas.filter(asignatura =>
      asignatura.nombre.toLowerCase().includes(this.searchTermAsignaturas.toLowerCase())
    );
  }
  
  get lineasFiltradas(): Linea[] {
    if (!this.searchTermLineas) {
      return this.lineas;
    }
    return this.lineas.filter(linea =>
      linea.nombre.toLowerCase().includes(this.searchTermLineas.toLowerCase()) || // busca por nombre de la linea
      linea.asignaturas.some(asignatura =>
        asignatura.nombre.toLowerCase().includes(this.searchTermLineas.toLowerCase()) // busca por asignaturas dentro de la linea
      )
    );
  }
}
