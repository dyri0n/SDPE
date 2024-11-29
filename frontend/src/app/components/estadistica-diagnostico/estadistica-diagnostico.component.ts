import { Component, OnInit } from '@angular/core';
import { ChartEvent } from 'chart.js';
import { DiagnosticosService } from '../../services/diagnosticos.service';
import { PromedioDiagnostico } from '../../models/diagnosticos.dto';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from '../../models/asignaturas.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AsignaturaDetalleDTO, AsignaturaFluxogramaNuevo } from '../../models/asignatura.dto';

@Component({
  selector: 'app-estadistica-diagnostico',
  standalone: true,
  imports: [ChartModule, CommonModule, FormsModule, MultiSelectModule],
  templateUrl: './estadistica-diagnostico.component.html',
  styleUrl: './estadistica-diagnostico.component.css',
})
export class EstadisticaDiagnosticoComponent implements OnInit {
  ngOnInit(): void {
    this.cursoAsignatura = this.route.snapshot.paramMap.get('codigoAsignatura')!;
    this.idFluxograma = +this.route.snapshot.paramMap.get('idFluxograma')!
    this.servicioDiagnosticos.obtenerPromedios().subscribe(diagnosticos=>{
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      this.anios = Array.from(new Set(diagnosticos.map(diagnostico => diagnostico.año))).sort().map(año => ({ label: año.toString(), value: año }))
      this.aniosSeleccionados = [...this.anios]
      //this.obtenerNombreAsignatura();
      this.obtenerNombreAsignaturaNuevo();
      this.obtenerPromedios();
    })
    
  }

  constructor(
    private servicioDiagnosticos: DiagnosticosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public asignatura: string = '';
  public asignaturaNueva?: AsignaturaDetalleDTO
  public idAsignatura: number = 0;
  public cursoAsignatura: string= ''
  public idFluxograma: number = 0
  public labels: string[] = [];
  public data: any;
  public anios: {label: string; value: number}[] = []
  public aniosSeleccionados: {label: string; value: number}[] = []
  public cortePromedios: number= 4
  public cargando: boolean= true
  public options = {
    responsive: true,
    scales: {
      x:{
        title: {
          display: true,
          text: 'Años',
          font: {
            size: 24
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Notas',
          font: {
            size: 24
          }
        }
      },
    },
    pointStyle: 'circle',
    pointRadius: 10,
    pointHoverRadius: 15,

    plugins: {
      title: {
        display: true,
        text: 'Promedio obtenido en cada evaluacion diagnostico',
        font: {
          size: 24
        }
      },
      annotation: {
        annotations: {
          criticalZone: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            yMin: 0,
            yMax: this.cortePromedios,
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        }
      },
      datalabels: {
        display: true,
        align: 'top', 
        font: {
          weight: 'bold', 
          size: 12, 
        },
        color: '#000', 
        backgroundColor: '#FFF',
        borderRadius: 3, 
        padding: 5, 
        borderColor: '#000', 
        borderWidth: 2, 
      }
    },

    onClick: (event: ChartEvent, activeElements: any[]) => {
      if (activeElements.length > 0) {
        const datasetIndex = activeElements[0].datasetIndex;
        const dataIndex = activeElements[0].index;
        const clickedLabel = this.labels[dataIndex];

        this.seleccionado(clickedLabel);
      }
    },
  };

  public seleccionado(diagnostic: string) {
    alert(`Has seleccionado: ${diagnostic}`);
  }

  public obtenerNombreAsignatura() {
    this.servicioDiagnosticos
      .obtenerNombreAsignatura(this.idAsignatura)
      .subscribe((asignatura) => {
        this.asignatura = asignatura.nombre;
      });
  }

  public obtenerNombreAsignaturaNuevo() {
    this.servicioDiagnosticos
      .obtenerNombreAsignaturaNuevo(this.cursoAsignatura)
      .subscribe((asignatura) => {
        this.asignaturaNueva = asignatura;
      });
  }

  public obtenerLabel(datos: PromedioDiagnostico[]): string[] {
    const aniosFiltrados = this.aniosSeleccionados.map(c => c.value)
    const separarAnios = Array.from(new Set(datos.filter(d => aniosFiltrados.includes(d.año)).map(a => a.año)))
    this.labels = separarAnios.map(anio => anio.toString())
    return this.labels
  }

  public obtenerDataset(datos: PromedioDiagnostico[]): number[] {
    const aniosFiltrados = this.aniosSeleccionados.map(c => c.value)
    const datosFiltrados = datos.filter(d => aniosFiltrados.includes(d.año))
    return datosFiltrados.map(element => element.promedio)
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  public obtenerPromedios() {
    this.labels=[]
    this.servicioDiagnosticos.obtenerPromedios().subscribe((diagnosticos) => {
      this.obtenerLabel(diagnosticos);

      this.data = {
        labels: this.labels,
        datasets: [
          {
            label: 'Promedio',
            data: this.obtenerDataset(diagnosticos),
            borderColor: this.getRandomColor(),
            borderWidth: 4,
          },
        ],
      };
    });
    this.aniosSeleccionados.sort((a,b)=>a.value - b.value)
  }

  public devolverAlFluxograma() {
    this.router.navigate(['/fluxograma', this.idFluxograma])
  }
}
