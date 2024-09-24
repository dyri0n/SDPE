import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Legend, scales } from 'chart.js';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-aprobacion-curso',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './aprobacion-curso.component.html',
  styleUrl: './aprobacion-curso.component.css',
})
export class AprobacionCursoComponent {
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
  }
}
