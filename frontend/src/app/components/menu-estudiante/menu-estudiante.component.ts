import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-estudiante',
  standalone: true,
  imports: [],
  templateUrl: './menu-estudiante.component.html',
  styleUrl: './menu-estudiante.component.css',
})
export class MenuEstudianteComponent {
  // nombre del estudiante seleccinoado en la vista anterior (listarEstudiantes)
  nombreEstudiante: string = '';
  // rut del estudiante seleccionado en la vista anterior
  rutEstudiante: string = '';
  // datos pasados por la ruta anterior
  routeData: any;

  // solo se inyecta el servicio router para redirigir a los vistas posibles
  constructor(private router: Router) {}

  ngOnInit() {
    // antes de cargar el componente se comprueba los valores obtenidos de la ruta
    this.nombreEstudiante = history.state.nombreCompleto;
    this.rutEstudiante = history.state.rut;
    // si no estan se envia a la ruta anterior (listar-estudiantes)
    if (!this.nombreEstudiante && this.rutEstudiante) {
      this.router.navigate(['/listar-estudiantes']);
    }
  }

  /**
   * Funcion que redirige al usuario a la vista de practicas del estudiante,
   * se envia a traves del estado de la ruta el rut del estudiante
   */
  public irAPracticasEstudiante() {
    const routerDataState = {
      rut: this.rutEstudiante,
      nombreCompleto: this.nombreEstudiante,
    };
    this.router.navigateByUrl('/practicas-estudiante', {
      state: routerDataState,
    });
  }
  /**
   * Funcion que redirige al usuario a la vista de avance curricular del estudiante,
   * se envia a traves del estado de la ruta el rut del estudiante
   */
  public irAAvanceCurricular() {
    const routerDataState = {
      rut: this.rutEstudiante,
      nombreCompleto: this.nombreEstudiante,
    };
    this.router.navigateByUrl('/avance-estudiante', {
      state: routerDataState,
    });
  }
  public devolverAListarEstudiantes() {
    this.router.navigateByUrl('/listar-estudiantes');
  }
}
