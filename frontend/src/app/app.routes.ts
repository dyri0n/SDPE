import { Routes } from '@angular/router';
import { FluxogramasComponent } from './components/fluxogramas/fluxogramas.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { SemestresComponent } from './components/semestres/semestres.component';
import { AprobacionCursoComponent } from './components/aprobacion-curso/aprobacion-curso.component';
import { DetalleFluxogramaComponent } from './components/detalle-fluxograma/detalle-fluxograma.component';
import { EstadisticaDiagnosticoComponent } from './components/estadistica-diagnostico/estadistica-diagnostico.component';
import { PracticasComponent } from './components/practicas/practicas.component';
import { ResultadoEndComponent } from './components/resultado-end/resultado-end.component';
import { AsignaturaCortePracticoComponent } from './components/asignatura-corte-practico/asignatura-corte-practico.component';
import { ListaConveniosComponent } from './components/lista-convenios/lista-convenios.component';
import { ConvenioComponent } from './components/convenio/convenio.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { authGuard, hasRoleGuard, loginGuard } from './guards/auth.guard';
import { AvanceEstudianteComponent } from './components/avance-estudiante/avance-estudiante.component';
import { PracticasEstudianteComponent } from './components/practicas-estudiante/practicas-estudiante.component';
import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { DetalleAsignaturaComponent } from './components/detalle-asignatura/detalle-asignatura.component';
import { ListarEstudianteComponent } from './components/listar-estudiante/listar-estudiante.component';
import { MenuEstudianteComponent } from './components/menu-estudiante/menu-estudiante.component';
import { Roles } from './models/login.dto';
import { ListaEndComponent } from './components/lista-end/lista-end.component';
import { GestionarLineasComponent } from './components/gestionar-lineas/gestionar-lineas.component';
/**
 * RUTAS                    ROLES
 * [/fluxogramas]       -> [todos - docente]
 * [/convenios]         -> [admin, jc, secretario]
 * [/asignaturas]       -> [admin,jc,secretario]
 * [/end]               -> [admin, jc,secretario]
 * [/practicas]         -> [admin,jc,docente,secretario,coordinador]
 * [/avance-individual] -> [admin,jc,secretario]
 */

export const routes: Routes = [
  { path: '', redirectTo: '/fluxogramas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [authGuard] },
  {
    path: 'fluxogramas',
    component: FluxogramasComponent,
    canActivate: [authGuard, hasRoleGuard],
    data: {
      roles: [
        Roles.ADMINISTRADOR,
        Roles.JEFA_CARRERA,
        Roles.SECRETARIO,
        Roles.COORDINADOR,
      ],
    },
  },
  {
    path: 'convenios',
    component: ListaConveniosComponent,
    canActivate: [authGuard, hasRoleGuard],
    data: {
      roles: [Roles.ADMINISTRADOR, Roles.JEFA_CARRERA, Roles.SECRETARIO],
    },
  },
  {
    path: 'convenio/:idConvenio',
    component: ConvenioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cursos/:idAsignatura',
    component: CursosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'end',
    component: ResultadoEndComponent,
    canActivate: [authGuard, hasRoleGuard],
    data: {
      roles: [Roles.ADMINISTRADOR, Roles.JEFA_CARRERA, Roles.SECRETARIO],
    },
  },
  {
    path: 'semestres',
    component: SemestresComponent,
    canActivate: [authGuard],
  },
  {
    path: 'aprobacion/:idAsignatura',
    component: AprobacionCursoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'fluxograma/:idFluxograma',
    component: DetalleFluxogramaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'estadisticas/:idAsignatura',
    component: EstadisticaDiagnosticoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'practicas',
    component: PracticasComponent,
    canActivate: [authGuard, hasRoleGuard],
    data: {
      roles: [
        Roles.ADMINISTRADOR,
        Roles.JEFA_CARRERA,
        Roles.SECRETARIO,
        Roles.DOCENTE,
        Roles.COORDINADOR,
      ],
    },
  },
  {
    path: 'asignaturas',
    component: AsignaturasComponent,
    canActivate: [authGuard, hasRoleGuard],
    data: {
      roles: [Roles.ADMINISTRADOR, Roles.JEFA_CARRERA, Roles.SECRETARIO],
    },
  },
  {
    path: 'detalle-asignatura/:idAsignatura',
    component: DetalleAsignaturaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'asignatura-corte-practico',
    component: AsignaturaCortePracticoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'avance-estudiante/:idEstudiante',
    component: AvanceEstudianteComponent,
  },
  {
    path: 'practicas-estudiante/:idEstudiante',
    component: PracticasEstudianteComponent,
  },
  {
    path: 'listar-estudiantes',
    component: ListarEstudianteComponent,
    canActivate: [authGuard, hasRoleGuard],
    data: {
      roles: [Roles.ADMINISTRADOR, Roles.JEFA_CARRERA, Roles.SECRETARIO],
    },
  },
  {
    path: 'menu-estudiante/:idEstudiante/:nombreEstudiante',
    component: MenuEstudianteComponent,
  },
  {path: 'ver-tendencias', component: TendenciasAsignaturaCortePracticoComponent, canActivate: [authGuard]},
  {path: 'practica-detalle/:titulo', component: DetallePracticaComponent, canActivate: [authGuard]},
  {path: 'practicas-convenio/:idConvenio', component: PracticasConvenioComponent, canActivate: [authGuard]},
  {path: 'gestionar-lineas/:idPlan', component:GestionarLineasComponent,canActivate: [authGuard]},
  { path: '**', redirectTo: '/menu' },
    
];
