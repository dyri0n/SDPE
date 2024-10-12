import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asignatura } from '../../models/asignaturas.dto';
import { AsignaturaService } from '../../services/asignatura.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  constructor(
    private router: Router,
    private asignaturaService: AsignaturaService
  ) { }

  ngOnInit() {
    this.obtenerDatos()
  }

  public asignaturas: Asignatura[]= []

  public verDetalles(id: number): void {
    this.router.navigate(['/detalles-asignatura', id]);
  }

  public obtenerDatos(){
    this.asignaturaService.obtenerAsignaturas().subscribe(asignaturas=>{
      this.asignaturas=asignaturas
      console.log(this.asignaturas)
    })
  }

}
