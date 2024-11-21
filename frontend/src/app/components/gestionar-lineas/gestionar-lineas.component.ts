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
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AsignaturaService } from '../../services/asignatura.service';
import { AsignaturaLinea, Linea } from '../../models/lineaAsignatura.dto';

@Component({
  selector: 'app-gestionar-lineas',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag, DialogModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './gestionar-lineas.component.html',
  styleUrl: './gestionar-lineas.component.css'
})
export class GestionarLineasComponent implements OnInit {

  asignaturas: AsignaturaLinea[] = []; 
  lineas: Linea[] = [];     
  asignaturasBackup: AsignaturaLinea[] = [];
  lineasBackup: Linea[] = [];     
  hayCambios: boolean = false;
  display: boolean = false;
  nuevoNombreLinea: string = '';

  constructor(
    private servicioAsignatura: AsignaturaService,
  ){ }

  ngOnInit(): void {
    this.cargarDatos()
  }
 
  public mostrarModal() {
    this.display = true;
  }

  public esconderModal() {
    this.display = false;
    this.nuevoNombreLinea = '';
  }

  public agregarLinea() {
    if (this.nuevoNombreLinea.trim()) {
      const nuevaLinea: Linea = {
        nombre: this.nuevoNombreLinea,
        asignaturas: []
      };
      this.lineas.push(nuevaLinea);
      this.lineasBackup.push(JSON.parse(JSON.stringify(nuevaLinea)));
      this.esconderModal();
      this.detectarCambios();
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
      if (event.previousContainer !== event.container) {
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
    console.log(this.lineas)
    console.log(this.lineasBackup)
    const asignaturasIguales = this.compararAsignaturasSinOrden(this.asignaturas, this.asignaturasBackup);
    const lineasIguales = this.lineas.every((linea, index) => {
      return this.compararAsignaturasSinOrden(linea.asignaturas, this.lineasBackup[index].asignaturas);
    });
    this.hayCambios = !(asignaturasIguales && lineasIguales);
    console.log('Cambios detectados', this.hayCambios);
  }

  public cancelarCambios(): void {
    this.lineas.forEach(linea => {
      linea.asignaturas = linea.asignaturas.filter(asignatura =>
        this.asignaturasBackup.some(origAsignatura => origAsignatura.nombre === asignatura.nombre)
      );
    });

    this.asignaturas = JSON.parse(JSON.stringify(this.asignaturasBackup));
    this.lineas = JSON.parse(JSON.stringify(this.lineasBackup));
    this.detectarCambios();
  }

  public confirmarCambios(): void {
    this.lineasBackup = JSON.parse(JSON.stringify(this.lineas));
    this.asignaturasBackup = JSON.parse(JSON.stringify(this.asignaturas));
    this.hayCambios = false;

    this.servicioAsignatura.guardarCambios(this.lineas)
    // .subscribe(() => {
    //   alert('Cambios guardados con éxito');
    //   // Actualizar el respaldo con los datos confirmados
    //   this.lineasBackup = [...this.lineas];
    //   this.asignaturasBackup = [...this.asignaturas]; // Respaldo también para asignaturas
    //   this.hayCambios = false; // Resetear el estado de cambios
    // },
    // error => {
    //   alert('Error al guardar cambios: ' + error.message);
    // });
  }
}
