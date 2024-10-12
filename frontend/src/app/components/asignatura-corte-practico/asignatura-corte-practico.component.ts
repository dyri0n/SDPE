import { Component, OnInit } from '@angular/core';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { Router } from '@angular/router';
import { Asignatura } from '../../models/asignaturas.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignatura-corte-practico',
  templateUrl: './asignatura-corte-practico.component.html',
  standalone: true,
  imports: [FormsModule],
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

  public asignaturas: Asignatura[]=[]
  public idPlan: number=1
  public asignaturaIdSeleccionada: number= 0

  public cargarDatos(){
    this.diagnosticosService.obtenerAsignaturas(this.idPlan).subscribe(asignaturas=>{
      this.asignaturas=asignaturas
    })
  }

  public seleccionarAsignatura(){
    this.router.navigate(['/estadisticas', this.asignaturaIdSeleccionada])
  }

}
