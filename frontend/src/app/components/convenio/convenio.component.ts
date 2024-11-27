import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConveniosService } from '../../services/convenios.service';
import { Convenio, DetalleConvenio, DetalleConvenioTest } from '../../models/convenios.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convenio',
  standalone: true,
  imports: [CommonModule],
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
    this.obtenerDetalleConvenioTest()
  }

  public idConvenio: number = -1
  public detalleConvenio!: DetalleConvenio
  public detalleConvenioTest!: DetalleConvenioTest

  public obtenerDetalleConvenio(){
    this.servicioConvenios.obtenerDetalleConvenio(this.idConvenio).subscribe(convenio =>{
      this.detalleConvenio = convenio
    })
  }

  public obtenerDetalleConvenioTest(){
    this.servicioConvenios.obtenerDetalleConvenioTest(this.idConvenio).subscribe(convenio =>{
      this.detalleConvenioTest = convenio
      this.detalleConvenioTest.promedioPracticas = parseFloat(this.detalleConvenioTest.promedioPracticas.toFixed(2))
    })
  }

  public verPracticas(idConvenio: number){
    this.router.navigate(['/practicas-convenio', idConvenio])
  }
}
