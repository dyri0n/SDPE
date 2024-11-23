import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AsignaturaService } from '../../services/asignatura.service';
import { AsignaturaLinea, Linea } from '../../models/lineaAsignatura.dto';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-gestionar-lineas',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag, DialogModule, FormsModule, ButtonModule, InputTextModule, FloatLabelModule, ReactiveFormsModule, ToastModule],
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
  hayCambios: boolean = false;
  display: boolean = false;

  public formularioLinea: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  })

  constructor(
    private servicioAsignatura: AsignaturaService,
    private messageService: MessageService
  ){ }

  ngOnInit(): void {
    this.cargarDatos()
  }
 
  public mostrarModal() {
    this.display = true;
  }

  public esconderModal() {
    this.display = false;
    this.formularioLinea.reset();
  }

  public agregarLinea() {
    if (this.formularioLinea.valid) {
      const nuevaLinea: Linea = {
        nombre: this.formularioLinea.value.nombre,
        asignaturas: []
      };
      this.lineas.push(nuevaLinea); // Se agrega a las líneas visibles
      this.esconderModal();
      this.detectarCambios(); // Detectar cambios al estado actual
    }
  }

  public quitarAsignatura(linea: any, asignatura: any): void {
    const index = linea.asignaturas.indexOf(asignatura);
    if (index !== -1) {
      linea.asignaturas.splice(index, 1);
      this.asignaturas.push(asignatura);
      this.detectarCambios(); 
    }
  }

  public cargarDatos(): void {
    this.servicioAsignatura.obtenerListadoAsignaturas().subscribe(data => {
      this.asignaturas = [...data];
      this.asignaturasBackup = JSON.parse(JSON.stringify(data));
    });
    
    this.servicioAsignatura.obtenerLineas().subscribe(data => {
      this.lineas = [...data];
      this.lineasBackup = JSON.parse(JSON.stringify(data));
    });
  }

  public drop(event: CdkDragDrop<any[]>, linea?: Linea): void {
    if (linea) {
      const asignatura = event.previousContainer.data[event.previousIndex];
      if (event.previousContainer === event.container) {
        moveItemInArray(linea.asignaturas, event.previousIndex, event.currentIndex);
      } else {
        event.previousContainer.data.splice(event.previousIndex, 1);
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
    // this.lineas.forEach(linea => {
    //   linea.asignaturas = linea.asignaturas.filter(asignatura =>
    //     this.asignaturasBackup.some(origAsignatura => origAsignatura.nombre === asignatura.nombre)
    //   );
    // });

    this.asignaturas = JSON.parse(JSON.stringify(this.asignaturasBackup));
    this.lineas = JSON.parse(JSON.stringify(this.lineasBackup));
    this.detectarCambios();
  }

  public confirmarCambios(): void {
    // this.servicioAsignatura.guardarCambios(this.lineas).subscribe(() => {
    //   alert('');
    //   // Actualizar el respaldo con los datos confirmados
    //   this.lineasBackup = [...this.lineas];
    //   this.asignaturasBackup = [...this.asignaturas]; // Respaldo también para asignaturas
    //   this.hayCambios = false; // Resetear el estado de cambios
    // },
    // error => {
    //   alert('Error al guardar cambios: ' + error.message);
    // });
    
    this.servicioAsignatura.guardarCambios(this.lineas).subscribe({
    next: (response) => {
      // Actualizar respaldo con el estado actual
      this.lineasBackup = JSON.parse(JSON.stringify(this.lineas));
      this.asignaturasBackup = JSON.parse(JSON.stringify(this.asignaturas));
      this.hayCambios = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: 'Cambios guardados con éxito',
      });
      console.log("xd",response)
    },
    error: (error: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error al guardar los cambios: ${error.message}`,
      });
    },
  });
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

