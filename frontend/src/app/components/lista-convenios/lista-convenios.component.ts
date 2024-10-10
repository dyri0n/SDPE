import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConveniosService } from '../../services/convenios.service';
import { Convenio, NuevoConvenio } from '../../models/convenios.dto';
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


@Component({
  selector: 'app-lista-convenios',
  standalone: true,
  imports: [PaginatorModule, DialogModule, ButtonModule, FloatLabelModule, CalendarModule, FileUploadModule, ReactiveFormsModule, InputTextModule, ToastModule],
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
    this.obtenerConvenios()
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

  // todo esto es para el paginator de primeng, aun no se como funciona.
  first: number = 0;
  rows: number = 10;
  public onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10; 
  }
  //
  
  public convenios: Convenio[] = []

  public verDetalle(id: number){
    this.router.navigate(['/convenio/', id])
  }

  public agregarConvenio(){
    if(this.formularioConvenio.valid){
      const nuevoConvenio: NuevoConvenio = this.formularioConvenio.value
      this.servicioConvenios.nuevoConvenio(nuevoConvenio)
      this.alternarModal()
      this.messageService.add({severity: 'success', summary: 'Guardado', detail: 'El convenio se guardó correctamente'});
    } else {
      this.messageService.add({
        severity: 'error', 
        summary: 'Error', 
        detail: 'Formulario incompleto. Por favor llene todos los campos requeridos.'
      });
    }
    
  }

  public obtenerConvenios(){
    this.servicioConvenios.obtenerConvenios().subscribe(convenio=>{
      this.convenios=convenio
    })
  }
}
