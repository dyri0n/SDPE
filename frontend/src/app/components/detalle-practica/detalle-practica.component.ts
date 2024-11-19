import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-practica',
  templateUrl: './detalle-practica.component.html',
  styleUrls: ['./detalle-practica.component.css']
})
export class DetallePracticaComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  alumno = {id: 1, nombreCompleto: 'Gilberto Manuel Natanael Arias Ossandón', cohorte: '2021', promedio: 6.7, imagen: ''}

  public menuAbierto: boolean = false

  public abrirMenu() {
    this.router.navigate(['/menu-alumno', this.alumno.id])
  }

  public navegarMenuAlumno(id: number) {
    this.router.navigate(['/menu-alumno', id])
  }

}
