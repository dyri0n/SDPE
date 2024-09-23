import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-aprobacion-curso',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './aprobacion-curso.component.html',
  styleUrl: './aprobacion-curso.component.css',
})
export class AprobacionCursoComponent {
  data: any;
  aprobacion = 540;
  reprobacion = 325;
  porc_apro = (
    (this.aprobacion / (this.aprobacion + this.reprobacion)) *
    100
  ).toPrecision(2);
  porc_repro = (
    (this.aprobacion / (this.aprobacion + this.reprobacion)) *
    100
  ).toPrecision(2);
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Aprobación', 'Reprobación'],
      datasets: [
        {
          labels: [
            `${this.porc_apro}% de aprobación`,
            `${this.porc_repro}% de reprobación`,
          ],
          data: [this.porc_apro, this.porc_repro],
          backgroundColor: [
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--green-300'),
            documentStyle.getPropertyValue('--red-300'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }
}
