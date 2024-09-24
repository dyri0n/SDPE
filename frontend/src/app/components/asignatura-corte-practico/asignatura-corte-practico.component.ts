import { Component, OnInit } from '@angular/core';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura-corte-practico',
  templateUrl: './asignatura-corte-practico.component.html',
  styleUrls: ['./asignatura-corte-practico.component.css']
})
export class AsignaturaCortePracticoComponent implements OnInit {

  constructor(
    private diagnosticosService: DiagnosticosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatos()
  }

  public asignaturas: string[]=[]

  public cargarDatos(){
    this.asignaturas.push(this.diagnosticosService.obtenerNombreAsignatura())
  }

  public seleccionarAsignatura(){
    var asignatura= document.getElementById('asignatura')
    this.router.navigateByUrl('estadisticas')
  }

}
