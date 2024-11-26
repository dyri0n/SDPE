import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ResultadosENDService } from '../../services/resultados-end.service';
import { resultadosEnd } from '../../models/resultadosEND.dto';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-lista-end',
  standalone: true,
  imports: [CardModule, PaginatorModule],
  templateUrl: './lista-end.component.html',
  styleUrl: './lista-end.component.css'
})
export class ListaEndComponent implements OnInit {

  constructor(
    private router: Router,
    private servicioResultadosEND: ResultadosENDService
  ){}

  ngOnInit() {
    this.obtenerListado()
  }

  listaResultados: resultadosEnd[] = [] 
  public resultadosFiltrados: resultadosEnd[] = []
  public resultadosPaginados: resultadosEnd[] = []
  public first: number = 0
  public rows: number = 6
  public totalRecords: number= 0

  public onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0
    this.rows = event.rows ?? 10 
    this.actualizarResultadosPaginados()
  }

  public actualizarResultadosPaginados() {
    const inicio = this.first
    const final = this.first + this.rows
    this.resultadosPaginados = this.resultadosFiltrados.slice(inicio, final)
  }

  public obtenerListado() {
    this.servicioResultadosEND.obtenerListaResultado().subscribe(respuesta => {
      this.listaResultados = respuesta
      this.resultadosFiltrados = respuesta
      this.totalRecords = this.resultadosFiltrados.length,
      this.actualizarResultadosPaginados() 
    })
  }

  public filtrarResultados(evento: any) {
    const query = evento.target.value.toLowerCase();
    
    // Expresiones regulares para detectar términos específicos o solo números
    const resultadoRegex = /resultados\s*(\d{1,4})/; // "resultados" seguido de hasta 4 dígitos
    const cohorteRegex = /cohorte\s*(\d{1,4})/;      // "cohorte" seguido de hasta 4 dígitos
    const soloNumeroRegex = /^\d{1,4}$/;             // Solo un número de hasta 4 dígitos
    
    let filtroPeriodo = null;
    let filtroCohorte = null;
    let buscarEnAmbos = false;
  
    // Verificar si el query coincide con algún patrón específico
    const resultadoMatch = query.match(resultadoRegex);
    const cohorteMatch = query.match(cohorteRegex);
    const soloNumeroMatch = query.match(soloNumeroRegex);
    
    if (resultadoMatch) {
      filtroPeriodo = resultadoMatch[1];
    } else if (cohorteMatch) {
      filtroCohorte = cohorteMatch[1];
    } else if (soloNumeroMatch) {
      // Si solo se ingresa un número, buscar en ambos campos
      buscarEnAmbos = true;
      filtroPeriodo = soloNumeroMatch[0];
      filtroCohorte = soloNumeroMatch[0];
    }
  
    this.resultadosFiltrados = this.listaResultados.filter(resultado => {
      const periodoMatch = filtroPeriodo ? resultado.periodo.toString().startsWith(filtroPeriodo) : true;
      const cohorteMatch = filtroCohorte ? resultado.cohorte.toString().startsWith(filtroCohorte) : true;
      
      return buscarEnAmbos ? periodoMatch || cohorteMatch : periodoMatch && cohorteMatch;
    });
  
    this.totalRecords = this.resultadosFiltrados.length;
    this.first = 0;
    this.actualizarResultadosPaginados();
  }
  
  public redirigirHacia(route: number) {
    // this.router.navigateByUrl(`/${route}`);
    this.router.navigate(['end'])
  }

}
