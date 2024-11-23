import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { AsignaturaSola } from '../../models/asignaturaSola.dto';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormsModule } from '@angular/forms';


Chart.register(ChartDataLabels);

@Component({
  selector: 'app-aprobacion-curso',
  standalone: true,
  imports: [CommonModule, ChartModule, FormsModule],
  templateUrl: './aprobacion-curso.component.html',
  styleUrl: './aprobacion-curso.component.css',
})
export class AprobacionCursoComponent {
  constructor(
    private route: ActivatedRoute,
    private diagnosticosService: DiagnosticosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idFluxograma = +this.route.snapshot.paramMap.get('idFluxograma')!
    this.idAsignatura = +this.route.snapshot.paramMap.get('idAsignatura')!;
    this.obtenerNombreAsignatura();
    this.cargarDatos()
  }

  public idAsignatura: number = 0;
  public idFluxograma: number = 0
  public asignatura?: AsignaturaSola;
  public cohortesData = [{cohorte: 2021, regular: {aprobacion: (Math.random() * 100).toPrecision(2)}, prosecucion: {aprobacion: (Math.random() * 100).toPrecision(2)}},
                        {cohorte: 2022, regular: {aprobacion: (Math.random() * 100).toPrecision(2)}, prosecucion: {aprobacion: (Math.random() * 100).toPrecision(2)}},
                        {cohorte: 2023, regular: {aprobacion: (Math.random() * 100).toPrecision(2)}, prosecucion: {aprobacion: (Math.random() * 100).toPrecision(2)}}]
  public chartData: any
  public cohorteSeleccionado: number = 2023
  public regData: any
  public proData: any

  public options: any = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          font: {
            weight: 'bold',
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`
          },
        },
      },
      datalabels: {
        color: 'white',
        formatter: (value: number) => {
          return `${value}%`
        },
        font: {
          weight: 'bold',
          size: 16,
        },
        anchor: 'center',
        align: 'center',
      },
    },
    legend: {
      position: 'top',
      labels: {
        boxWidth: 20,
      },
    },
  }

  public obtenerNombreAsignatura() {
    this.diagnosticosService
      .obtenerNombreAsignatura(this.idAsignatura)
      .subscribe((asignatura) => {
        this.asignatura = asignatura;
      });
  }

  public cargarDatos(){
    const seleccionado = this.cohortesData.find(c => c.cohorte === Number(this.cohorteSeleccionado))
    if (seleccionado) {

      const aprobacionReg = parseFloat(seleccionado.regular.aprobacion)
      const aprobacionPro = parseFloat(seleccionado.prosecucion.aprobacion)
      
      const reprobacionReg = (100 - aprobacionReg).toPrecision(2)
      const reprobacionPro = (100 - aprobacionPro).toPrecision(2)

      this.regData = {
        labels: ['Aprobación', 'Reprobación'],
        datasets: [
          {
            data: [aprobacionReg, reprobacionReg],
            backgroundColor: ['rgba(2, 132, 199, 0.8)', 'rgba(225, 29, 72, 0.8)']
          }
        ]
      }

      this.proData = {
        labels: ['Aprobación', 'Reprobación'],
        datasets: [
          {
            data: [aprobacionPro, reprobacionPro],
            backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)']
          }
        ]
      }
    }
  }

  public devolverAListarCursos() {
    this.router.navigate(['/cursos',this.idFluxograma, this.idAsignatura])
  }
}
