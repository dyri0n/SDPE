import { Component } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Estudiante } from '../../models/estudiante';
import { CohorteEstudiantes } from '../../models/listar-estudiantes';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-listar-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    SkeletonModule,
    FormsModule,
    PaginatorModule,
    ContextMenuModule,
  ],
  templateUrl: './listar-estudiante.component.html',
  styleUrl: './listar-estudiante.component.css',
})
/**
 * Componente que lista a todos los estudiante de la carrera para acceder a detalles de cada estudiante
 * La funciones principales que tiene esta vista primero es poder visualizar a todos los estudiantes obtenidos
 * del servicio, luego se puede filtrar por la cohorte o agnio de ingreso del estudiante, tambien se puede
 * buscar por el nombre o rut del estudiante a traves de un input.
 *
 * Finalmente el proposito de esta vista es poder escoger un estudiante para visualizar
 * detalles mas avanzados del mismo osea ver su menu estudiante.
 *
 */
export class ListarEstudianteComponent {
  // aca se almacenaria los estudiantes traido por el servicio al cargar el componente
  estudiantes_por_cohorte: CohorteEstudiantes[] = [] as CohorteEstudiantes[];
  // representa si termina de obtener los valores del servicio estudiante
  cargando: boolean = true;
  // almacena el cohorte seleccionado por el usuario, se utiliza para poder filtrar por el cohorte
  cohorteSeleccionado: number | null = null;
  // almacena la busqueda de un estudiante a traves de la propieda ngModel del elemento input
  input_estudiante: string = '';
  // arreglo que almacena a los estudiante que se ven en la vista, se ira modificando dependiendo del filtro que se elija
  estudiantesFiltrados: Estudiante[] = [];
  // cantidad de estudiantes para mostrar por pagina
  estudiantesPorPagina: number = 6;
  // cantidad total de todos lo esutdiantes considearando el arreglo estudiantesPorPagina
  registrosTotales: number = 0;
  // pagina actual donde esta ubicado el usuario a la hora de seleccionar la paginacion
  paginaActual: number = 1;
  // opciones del menu contextual
  opcionMenuContextual: MenuItem[] | undefined;

  // se inyecta el servicio estudiante y router para redigirir a las otras vistas
  constructor(
    private estudianteService: AlumnoService,
    private router: Router
  ) {}

  ngOnInit() {
    // La primera vez que se carga la vista va a traer todos los datos, para luego filtrar por cohorte.
    this.estudianteService.getEstudiantes().subscribe((responseEstudiantes) => {
      this.estudiantes_por_cohorte =
        responseEstudiantes as CohorteEstudiantes[];
    });

    // timeout para probar la animacion de carga de los componentes estudiantes
    setTimeout(() => {
      this.cargando = false;
      this.mostrarTodosLosEstudiantes();
    }, 2000);

    // se inicializa las opciones del menu contextual
    this.opcionMenuContextual = [
      { label: 'Practicas', command: () => {} },
      { label: 'Avance individual' },
    ];
  }

  /**
   * Funcion para filtrar los datos por cohorte, recibe el agnio de la cohorte por la
   * cual se quiere filtrar, esta funciona permite que el usuario pueda visualizar a los estudiantes
   * por la cohorte que desee.
   *
   * @param {string} year El agnio del cohorte que se quiere filtrar
   */
  public filtrarPorCohorte(year: number) {
    this.paginaActual = 1;
    const cohort = this.estudiantes_por_cohorte.find((c) => c.cohorte === year);
    this.estudiantesFiltrados = cohort ? cohort.estudiantes : [];
    this.cohorteSeleccionado = year;
  }

  /**
   * Funcion para buscar estudainte por rut o nombre
   * Si no se modifica el input de busqueda se retorna el arreglo sin modificaciones, sino se
   * filtra por rut o nombre
   *
   * @return {Estudiante[]} retorna el arreglo con lo estudiantes filtrados
   */
  public buscarEstudiante(): Estudiante[] {
    if (!this.input_estudiante) {
      return this.estudiantesFiltrados;
    }
    const textoBusqueda = this.input_estudiante.toLowerCase();

    // Filtra estudiantes por nombre o rut
    return this.estudiantesFiltrados.filter(
      (estudiante) =>
        estudiante.nombre_completo.toLowerCase().includes(textoBusqueda) ||
        estudiante.rut.includes(textoBusqueda)
    );
  }

  /**
   * Funcion para mostrar a todos lo estudiantes traidos del servicio
   * Obtiene a todos los estudiantes sin ordenar por cohorte,
   * la vista por defecto se carga con esta funcion para primero mostrar a todos los estudiantes
   */
  public mostrarTodosLosEstudiantes() {
    this.estudiantesFiltrados = this.estudiantes_por_cohorte.flatMap(
      (cohorte) => cohorte.estudiantes
    );
    this.cohorteSeleccionado = null;
  }
  /**
   * Funcion para redigirir a la vista donde se encuentra el menu del estudiante seleccionado a traves
   * de esta vista, para redirigir se utiliza el servicio router que permite navegar con url y pasar
   * valores o estado al navegar.
   *
   * @param {Estudiante} estudianteSeleccionado El estudiante seleccionado para ver su menu
   */
  public irAMenuEstudiante(estudianteSeleccionado: Estudiante) {
    const routerDataState = {
      rut: estudianteSeleccionado.rut,
      nombreCompleto: estudianteSeleccionado.nombre_completo,
    };
    this.router.navigateByUrl('/menu-estudiante', { state: routerDataState });
  }

  /**
   *  Funcion para manejar la funcion para cambiar de pagina del component paginator de primeng
   *
   * @param evento El evento de clicker el numero de pagina que se quiere cambiar
   */

  public onCambioDePagina(evento: any) {
    this.paginaActual = evento.page + 1;
    this.estudiantesPorPagina = evento.rows;
    this.obtenerEstudiantesPaginados();
  }

  /**
   * funcion para obtener a los alumnos distribuido por la variable estudiantesPorPagina
   *
   * @returns {Estudiante []} Retorna una arreglo de estudiantes
   */
  public obtenerEstudiantesPaginados(): Estudiante[] {
    const indiceInicial = (this.paginaActual - 1) * this.estudiantesPorPagina;
    const indiceFinal = indiceInicial + this.estudiantesPorPagina;
    return this.estudiantesFiltrados.slice(indiceInicial, indiceFinal);
  }

  /**
   * Funcion para obtener la cantidad de estudiantes que hay actualmente, osea al aplicar filtros como cohorte o busqueda
   *
   * @returns {number} retorna la cantidad de estudiantes que hay para mostrar
   */
  public obtenerCantidadTotalEstudiantes(): number {
    return this.estudiantesFiltrados.length;
  }
}
