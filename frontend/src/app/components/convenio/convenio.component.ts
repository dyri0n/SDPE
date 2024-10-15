import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConveniosService } from '../../services/convenios.service';
import { Convenio, DetalleConvenio } from '../../models/convenios.dto';

@Component({
  selector: 'app-convenio',
  standalone: true,
  imports: [],
  templateUrl: './convenio.component.html',
  styleUrl: './convenio.component.css'
})
export class ConvenioComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioConvenios: ConveniosService
  ){}

  ngOnInit() {
    this.idConvenio= +this.route.snapshot.paramMap.get('idConvenio')!
    console.log(this.idConvenio)
    this.obtenerDetalleConvenio()
  }

  public idConvenio: number = -1
  public detalleConvenio!: DetalleConvenio // por ahora lo dejo como convenio pero deberia ser detalleConvenio para traer los datos de practicas.

  public obtenerDetalleConvenio(){
    this.servicioConvenios.obtenerDetalleConvenio(this.idConvenio).subscribe(convenio =>{
      this.detalleConvenio = convenio
    })
  }
}
