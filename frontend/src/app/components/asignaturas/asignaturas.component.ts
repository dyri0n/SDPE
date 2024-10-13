import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asignatura } from '../../models/asignaturas.dto';
import { AsignaturaService } from '../../services/asignatura.service';
import { ListaAsignatura } from '../../models/listaAsignatura.dto';

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

  public asignaturas: ListaAsignatura[]= []
  public asignaturasFiltradas: ListaAsignatura[]=[]

  public verDetalles(id: number): void {
    this.router.navigate(['/detalles-asignatura', id]);
  }

  public filtrarAsignaturas(evento: any) {
    const query = evento.target.value.toLowerCase();
    this.asignaturasFiltradas = this.asignaturas.filter(asignatura =>
      asignatura.nombre.toLowerCase().includes(query) || asignatura.codigo.toLowerCase().includes(query)
    )
  }

  public obtenerDatos(){
    this.asignaturaService.obtenerAsignaturas().subscribe(asignaturas=>{
      this.asignaturas=asignaturas
      this.asignaturasFiltradas=asignaturas
    })
  }

}
