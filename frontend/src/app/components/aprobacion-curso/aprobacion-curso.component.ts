import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { AsignaturaSola } from '../../models/asignaturaSola.dto';
@Component({
  selector: 'app-aprobacion-curso',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './aprobacion-curso.component.html',
  styleUrl: './aprobacion-curso.component.css',
})
export class AprobacionCursoComponent {

  constructor(
    private route: ActivatedRoute,
    private diagnosticosService: DiagnosticosService
  ) {}

  ngOnInit() {
    this.regData = {
      labels: ['Aprobación', 'Reprobación'],
      datasets: [
        {
          label: 'Porcentaje',
          data: [this.porc_apro_reg, this.porc_repro_reg],
          backgroundColor: ['rgba(2, 132, 199, 0.8)', 'rgba(225, 29, 72, 0.8)']
        },
      ],
    };
    
    this.proData = {
      labels: ['Aprobación', 'Reprobación'],
      datasets: [
        {
          label: 'Porcentaje',
          data: [this.porc_apro_pro, this.porc_repro_pro],
          backgroundColor: ['rgba(2, 132, 199, 0.8)', 'rgba(225, 29, 72, 0.8)']
        },
      ],
    };

    this.idAsignatura= +this.route.snapshot.paramMap.get('idAsignatura')!
    this.obtenerNombreAsignatura()
  } 

  public idAsignatura: number=0
  public asignatura?: AsignaturaSola
  regData: any;
  proData: any;
  aprobacion_reg = (Math. random() * (2000 - 500) + 500)
  aprobacion_pro = (Math. random() * (2000 - 500) + 500);
  reprobacion_reg = (Math. random() * (2000 - 500) + 500);
  reprobacion_pro = (Math. random() * (2000 - 500) + 500);
  porc_apro_reg = (
    (this.aprobacion_reg / (this.aprobacion_reg + this.reprobacion_reg)) *
    100
  ).toPrecision(2);
  porc_repro_reg = (
    (this.reprobacion_reg / (this.aprobacion_reg + this.reprobacion_reg)) *
    100
  ).toPrecision(2);
  
  porc_apro_pro = (
    (this.aprobacion_pro / (this.aprobacion_pro + this.reprobacion_pro)) *
    100
  ).toPrecision(2);
  porc_repro_pro = (
    (this.reprobacion_pro / (this.aprobacion_pro + this.reprobacion_pro)) *
    100
  ).toPrecision(2);

  options: any = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
    legend: {
      display: false
    },
  };

  public obtenerNombreAsignatura(){
    this.diagnosticosService.obtenerNombreAsignatura(this.idAsignatura).subscribe(asignatura=>{
      this.asignatura=asignatura
    })
  }
 
}
