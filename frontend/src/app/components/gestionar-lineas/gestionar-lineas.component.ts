import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';


@Component({
  selector: 'app-gestionar-lineas',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './gestionar-lineas.component.html',
  styleUrl: './gestionar-lineas.component.css'
})
export class GestionarLineasComponent {
  
  asignaturas: any[] = [
    { id: 1, nombre: 'Matemáticas' },
    { id: 2, nombre: 'Física' },
    { id: 3, nombre: 'Química' }
  ];

  lineas: any[] = [
    { nombre: 'Línea 1', asignaturas: [] },
    { nombre: 'Línea 2', asignaturas: [] }
  ];

  // Variables para manejar el estado de arrastre
  dragData: any;
  isOver: boolean = false;

  onDragStart(event: any, asignatura: any) {
    this.dragData = asignatura; // Guardamos la asignatura que se está arrastrando
  }

  onDragEnter() {
    this.isOver = true;  // Establecemos un estilo cuando el elemento está sobre la zona droppable
  }

  onDragLeave() {
    this.isOver = false;  // Restablecemos el estilo cuando el elemento sale de la zona droppable
  }

  onDrop(event: any, linea: any) {
    if (this.dragData) {
      linea.asignaturas.push(this.dragData); // Añadimos la asignatura a la línea correspondiente
      this.asignaturas = this.asignaturas.filter(a => a !== this.dragData); // Eliminamos la asignatura de la lista original
      this.dragData = null; // Limpiamos el dragData después de soltarla
    }
  }

  // Eliminar una asignatura de la línea y devolverla al listado
  onRemoveFromLinea(asignatura: any, linea: any) {
    // Eliminar la asignatura de la línea
    linea.asignaturas = linea.asignaturas.filter((a: any) => a.id !== asignatura.id);
    
    // Devolver la asignatura al listado
    this.asignaturas.push(asignatura);
  }

}
