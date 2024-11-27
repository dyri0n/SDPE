import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConveniosService } from '../../services/convenios.service';
import { ActualizarConvenio, DetalleConvenio, Modalidad } from '../../models/convenios.dto';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-convenio',
  standalone: true,
  imports: [CommonModule,ProgressSpinnerModule, DialogModule, FileUploadModule, ReactiveFormsModule, FloatLabelModule, CalendarModule, ToastModule, DropdownModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './convenio.component.html',
  styleUrl: './convenio.component.css'
})
export class ConvenioComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioConvenios: ConveniosService,
    private messageService: MessageService
  ){}

  ngOnInit() {
    this.idConvenio= +this.route.snapshot.paramMap.get('idConvenio')!
    console.log(this.idConvenio)
    //this.obtenerDetalleConvenio()
    this.obtenerDetalleConvenio()
    this.obtenerModalidades()
  }

  public formularioConvenio: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    centro: new FormControl({value: '', disabled: true}, [Validators.required]),
    idModalidad: new FormControl('', [Validators.required]),
    inicio: new FormControl({value: '', disabled: true}, [Validators.required]),
    imagen: new FormControl(null),
    terminos: new FormControl(null),
    nombreModalidad: new FormControl('')
  })

  public formularioConvenioOriginal!: FormGroup
  
  public inicioMinimo: Date = new Date(2017, 0, 1);;
  public inicioMaximo: Date = new Date();;
  public modalidades: Modalidad[] = []
  public modalidadOriginal!: number

  public visible: boolean = false;
  public modalidadNueva: boolean = false;

  public idConvenio!: number
  public detalleConvenioTest!: DetalleConvenio
  public cargando: boolean = true;
 
  public camposDeshabilitados = true;


  public obtenerDetalleConvenio(){
    this.servicioConvenios.obtenerDetalleConvenios(this.idConvenio).subscribe(convenio =>{
      this.formularioConvenio.patchValue({
        nombre: convenio.convenio.titulo,
        centro: convenio.convenio.centroPractica,
        idModalidad: convenio.convenio.idModalidad,
        inicio: new Date(convenio.convenio.fechaInicioConvenio).getFullYear().toString(),
        imagen: convenio.convenio.urlFoto,
        terminos: convenio.convenio.documentoConvenio
      })

      this.formularioConvenioOriginal = new FormGroup({
        nombre: new FormControl(convenio.convenio.titulo),
        centro: new FormControl(convenio.convenio.centroPractica),
        idModalidad: new FormControl(convenio.convenio.idModalidad),
        inicio: new FormControl(new Date(convenio.convenio.fechaInicioConvenio).getFullYear().toString(),),
        imagen: new FormControl(convenio.convenio.urlFoto),
        terminos: new FormControl(convenio.convenio.documentoConvenio),
      });

      this.formularioConvenioOriginal = {...this.formularioConvenio.value}
      this.detalleConvenioTest = convenio
      this.modalidadOriginal = convenio.convenio.idModalidad
      this.detalleConvenioTest.promedioPracticas = parseFloat(this.detalleConvenioTest.promedioPracticas.toFixed(2))
      this.cargando = false
      console.log(convenio)
      console.log(this.formularioConvenio, 'conv')
      console.log(this.formularioConvenioOriginal, 'oriug')
    })
  }

  public obtenerModalidades(){
    this.servicioConvenios.obtenerConvenios().subscribe(resultado => {
      this.modalidades = resultado.modalidades
    })
  }

  public alternarModal() {
    this.visible = !this.visible;
    if(!this.visible){
      this.formularioConvenio.patchValue(this.formularioConvenioOriginal);
      this.modalidadNueva = false;
    }
  }

  public alternarModalidad() {
    if (this.modalidadNueva){
      this.modalidadNueva = false;
      this.formularioConvenio.patchValue({
        idModalidad: this.modalidadOriginal,
        nombreModalidad: null
      });
    }
    else{
      this.modalidadNueva = true;
      this.formularioConvenio.patchValue({
        idModalidad: 0,
        nombreModalidad: ''
      });
    }
    console.log(this.formularioConvenio.value)
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

  public editarConvenio(){
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

      const actualizarConvenio: ActualizarConvenio = {
          titulo: this.formularioConvenio.value.nombre,
          centroPractica: this.formularioConvenio.value.centro,
          fechaInicioConvenio: fechaInicioConvenio,
          fechaFinConvenio: fechaFinConvenio,
          documentoConvenio: this.formularioConvenio.value.terminos.name,
          urlFoto: this.formularioConvenio.value.imagen.name,
          idModalidad: this.formularioConvenio.value.idModalidad
        }
      
      if (this.modalidadNueva && !this.formularioConvenio.value.nombreModalidad) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Debe ingresar un nombre de modalidad.'
        });
        return;
           
      } else {
        actualizarConvenio.nombreModalidad = this.formularioConvenio.value.nombreModalidad   
      }

      console.log(actualizarConvenio, "LOL")
      this.servicioConvenios.actualizarConvenio(this.idConvenio ,actualizarConvenio).subscribe(
        respuesta=>{
          if(respuesta){
            this.alternarModal()
            this.messageService.add({severity: 'success', summary: 'Guardado', detail: 'El convenio se editó correctamente'});
          }
          window.location.reload()
        },
        error => {
          const mensaje = error.error.message
          this.messageService.add({
            severity: 'error',
            summary: 'Error al guardar',
            detail: mensaje,
          });
        }
      )
    } else {
      this.messageService.add({
        severity: 'error', 
        summary: 'Error', 
        detail: 'Formulario incompleto. Por favor llene todos los campos requeridos.'
      });
    }
  }

}
