import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConveniosService } from '../../services/convenios.service';
import { ConvenioListaTest, CreateConvenioDTO } from '../../models/convenios.dto';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-lista-convenios',
  standalone: true,
  imports: [PaginatorModule, DialogModule, ButtonModule, FloatLabelModule, CalendarModule, FileUploadModule, ReactiveFormsModule, InputTextModule, ToastModule, CommonModule],
  providers: [MessageService],
  templateUrl: './lista-convenios.component.html',
  styleUrl: './lista-convenios.component.css'
})
export class ListaConveniosComponent implements OnInit{

  constructor(
    private router: Router,
    private servicioConvenios: ConveniosService,
    private messageService: MessageService
  ){}

  ngOnInit() {
    this.obtenerConveniosTest()
  }

  public visible: boolean = false;
  public periodo: boolean = true;
  public modalidadNueva: boolean = false;

  //llamarlas desde servicio (backend)
  public modalidades = ['Modalidad 1', 'Modalidad 2', 'Modalidad 3'];

  public inicioMinimo: Date = new Date(2017, 0, 1);;
  public inicioMaximo: Date = new Date();;

  public formularioConvenio: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    centro: new FormControl('', [Validators.required]),
    modalidad: new FormControl('', [Validators.required]),
    inicio: new FormControl('', [Validators.required]),
    imagen: new FormControl(null,  [Validators.required]),
    terminos: new FormControl(null,  [Validators.required])
  })
  
  value = ''
  public alternarModal() {
    this.visible = !this.visible;
    if(!this.visible){
      this.formularioConvenio.reset()
    }
  }

  public alternarPeriodo() {
    this.periodo = !this.periodo;
    if (!this.periodo) {
        const año = new Date().getFullYear();
        
        this.formularioConvenio.patchValue({
            inicio: año.toString()
        });
    } else {
        this.formularioConvenio.patchValue({
            inicio: '' 
        });
    }
}

  public alternarModalidad() {
    if (this.modalidadNueva){
      this.modalidadNueva = false;
    }
    else{
      this.modalidadNueva = true;
      this.formularioConvenio.patchValue({
        modalidad: ''
      });
    }
  }

  public seleccionarArchivo(event: any, tipo: string) {
    const file = event.files[0];
  
    if (tipo === 'imagen') {
      this.formularioConvenio.patchValue({
        imagen: file
      });
    } else if (tipo === 'terminos') {
      this.formularioConvenio.patchValue({
        terminos: file 
      });
    }
  }

  public borrarArchivo(event: any, tipo: string) {
    if (tipo === 'imagen') {
      this.formularioConvenio.patchValue({
        imagen: null
      });
    } else if (tipo === 'terminos') {
      this.formularioConvenio.patchValue({
        terminos: null
      });
    }
  }

  public first: number = 0;
  public rows: number = 5;
  public totalRecords: number= 0
  public onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10; 
    this.actualizarConveniosPaginados()
  }

  public actualizarConveniosPaginados() {
    const inicio = this.first
    const final = this.first + this.rows
    this.conveniosPaginados = this.conveniosFiltrados.slice(inicio, final)
  }
  
  public conveniosTest: ConvenioListaTest[] = []
  public conveniosFiltrados: ConvenioListaTest[]=[]
  public conveniosPaginados: ConvenioListaTest[]=[]


  public verDetalle(id: number){
    this.router.navigate(['/convenio/', id])
  }

  public eliminarConvenio(id: number){
    this.servicioConvenios.eliminarConvenio(id).subscribe(respuesta=>{
      if(respuesta){
        Swal.fire(
          '¡Eliminado!',
          'El convenio ha sido eliminado.',
          'success'
        )
        this.obtenerConveniosTest()
        }
      })
  }

  public confirmarEliminacion(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.eliminarConvenio(id)
      }
    })
  }

  public agregarConvenio(){
    if(this.formularioConvenio.valid){
      const inicioFormulario= this.formularioConvenio.value.inicio
      let fechaInicioConvenio: Date
      if(typeof inicioFormulario === 'string'){
        fechaInicioConvenio = new Date()
      }else if(inicioFormulario instanceof Date){
        const nuevoAño = inicioFormulario.getFullYear()
        const fechaActual = new Date()
        fechaInicioConvenio = new Date(nuevoAño, fechaActual.getMonth(), fechaActual.getDate())
      }else{
        fechaInicioConvenio = new Date()
      }

      const fechaFinConvenio = new Date(fechaInicioConvenio.getFullYear(), 11, 31)

      const nuevoConvenioTest: CreateConvenioDTO= {
          titulo: this.formularioConvenio.value.nombre,
          centroPractica: this.formularioConvenio.value.centro,
          fechaInicioConvenio: fechaInicioConvenio,
          fechaFinConvenio: fechaFinConvenio,
          documentoConvenio: this.formularioConvenio.value.terminos.name,
          urlFoto: this.formularioConvenio.value.imagen.name,
          idModalidad: this.modalidades.indexOf(this.formularioConvenio.value.modalidad) + 1
        }
      
      this.servicioConvenios.nuevoConvenioTest(nuevoConvenioTest).subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          if (respuesta) {
            this.alternarModal();
            this.messageService.add({
              severity: 'success',
              summary: 'Guardado',
              detail: 'El convenio se guardó correctamente'
            });
            this.obtenerConveniosTest();
          }
        },
        error: (error) => {
          console.error('Error al guardar el convenio:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al guardar el convenio. Inténtalo nuevamente.'
          });
        }
      })
    } else {
      this.messageService.add({
        severity: 'error', 
        summary: 'Error', 
        detail: 'Formulario incompleto. Por favor llene todos los campos requeridos.'
      });
    }
  }

  public obtenerConveniosTest(){
    this.servicioConvenios.obtenerConveniosTest().subscribe(convenio=>{
      this.conveniosTest=convenio
      this.conveniosFiltrados=this.conveniosTest
      this.totalRecords=this.conveniosFiltrados.length
      this.actualizarConveniosPaginados()
    })
  }

  public filtrarConvenios(evento: any) {
    const query = evento.target.value.toLowerCase();
    this.conveniosFiltrados = this.conveniosTest.filter(convenio =>
      convenio.nombreConvenio.toLowerCase().includes(query) || convenio.centroPractica.toLowerCase().includes(query)
    )
    this.totalRecords=this.conveniosFiltrados.length
    this.first=0
    this.actualizarConveniosPaginados()
  }
}
