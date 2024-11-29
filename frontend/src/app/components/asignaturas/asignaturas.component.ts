import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignaturaService } from '../../services/asignatura.service';
import { ListaAsignatura } from '../../models/listaAsignatura.dto';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { AsignaturaDetalleDTO } from '../../models/asignatura.dto';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  standalone:true,
  imports: [PaginatorModule, CommonModule],
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
  public asignaturasNuevo: AsignaturaDetalleDTO[]= []
  public asignaturasFiltradas: ListaAsignatura[]=[]
  public asignaturasFiltradasNuevo: AsignaturaDetalleDTO[]=[]
  public asignaturasPaginadas: ListaAsignatura[]=[]
  public asignaturasPaginadasNuevo: AsignaturaDetalleDTO[]=[]
  public first: number = 0
  public rows: number = 5
  public totalRecords: number= 0
  public cargando: boolean=true

  public verDetalles(id: number): void {
    this.router.navigate(['/detalle-asignatura', id]);
  }

  public verDetallesNuevo(codigoAsignatura: string): void {
    this.router.navigate(['/detalle-asignatura', codigoAsignatura]);
  }

  public onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0
    this.rows = event.rows ?? 10 
    this.actualizarAsignaturasPaginadas()
  }

  public onPageChangeNuevo(event: PaginatorState) {
    this.first = event.first ?? 0
    this.rows = event.rows ?? 10 
    this.actualizarAsignaturasPaginadasNuevo()
  }

  public actualizarAsignaturasPaginadas() {
    const inicio = this.first
    const final = this.first + this.rows
    this.asignaturasPaginadas = this.asignaturasFiltradas.slice(inicio, final)
  }

  public actualizarAsignaturasPaginadasNuevo() {
    const inicio = this.first
    const final = this.first + this.rows
    this.asignaturasPaginadasNuevo = this.asignaturasFiltradasNuevo.slice(inicio, final)
  }

  public filtrarAsignaturas(evento: any) {
    const query = evento.target.value.toLowerCase();
    this.asignaturasFiltradas = this.asignaturas.filter(asignatura =>
      asignatura.nombre.toLowerCase().includes(query) || asignatura.codigo.toLowerCase().includes(query)
    )
    this.totalRecords=this.asignaturasFiltradas.length
    this.first=0
    this.actualizarAsignaturasPaginadas()
  }

  public filtrarAsignaturasNuevo(evento: any) {
    const query = evento.target.value.toLowerCase();
    this.asignaturasFiltradasNuevo = this.asignaturasNuevo.filter(asignatura =>
      asignatura.nombreAsignatura.toLowerCase().includes(query) || asignatura.codigoAsignatura.toLowerCase().includes(query)
    )
    this.totalRecords=this.asignaturasFiltradasNuevo.length
    this.first=0
    this.actualizarAsignaturasPaginadasNuevo()
  }

  public obtenerDatos(){
    /*this.asignaturaService.obtenerAsignaturas().subscribe(asignaturas=>{
      this.asignaturas=asignaturas
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      this.asignaturasFiltradas=asignaturas
      this.totalRecords=this.asignaturasFiltradas.length
      this.actualizarAsignaturasPaginadas()
    })*/
    this.asignaturaService.obtenerAsignaturasNuevo().subscribe(asignaturas=>{
      this.asignaturasNuevo=asignaturas
      this.cargando = true
      setTimeout(() => {
        this.cargando = false
      }, 1000)
      this.asignaturasFiltradasNuevo=asignaturas
      this.totalRecords=this.asignaturasFiltradasNuevo.length
      this.actualizarAsignaturasPaginadasNuevo()
    })
  }

}
