import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practicas-convenio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practicas-convenio.component.html',
  styleUrls: ['./practicas-convenio.component.css']
})
export class PracticasConvenioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public practicas = [{nombre: 'María Aravena Aracena', titulo: 'PRÁCTICA 1 (Plan 2018 v2)', fechaInicio: '02/10/2024', fechaTermino: '02/12/2024', nota: 6.4},
                {nombre: 'Dominga Cárdenas Silva', titulo: 'PRÁCTICA 4 (Plan 2018 v2)', fechaInicio: '02/10/2024', fechaTermino: '02/12/2024', nota: 7.0},
                {nombre: 'Daniela Alday Yampara', titulo: 'PRÁCTICA Profesional (Plan 2018 v2)', fechaInicio: '02/10/2024', fechaTermino: '02/12/2024', nota: 6.8}]

}
