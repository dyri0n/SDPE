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
import { authGuard, loginGuard } from './guards/auth.guard';
import { AvanceEstudianteComponent } from './components/avance-estudiante/avance-estudiante.component';
import { PracticasEstudianteComponent } from './components/practicas-estudiante/practicas-estudiante.component';
import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { DetalleAsignaturaComponent } from './components/detalle-asignatura/detalle-asignatura.component';
import { TendenciasAsignaturaCortePracticoComponent } from './components/tendencias-asignatura-corte-practico/tendencias-asignatura-corte-practico.component';
import { DetallePracticaComponent } from './components/detalle-practica/detalle-practica.component';
import { PracticasConvenioComponent } from './components/practicas-convenio/practicas-convenio.component';

export const routes: Routes = [
    {path: 'login', component:LoginComponent, canActivate: [loginGuard]},
    {path: 'menu', component: MenuComponent, canActivate: [authGuard]},
    {path: 'fluxogramas', component: FluxogramasComponent, canActivate: [authGuard]},
    {path: 'convenios', component: ListaConveniosComponent, canActivate: [authGuard]},
    {path: 'convenio/:idConvenio', component:ConvenioComponent, canActivate: [authGuard]},
    {path: 'cursos/:idAsignatura', component: CursosComponent, canActivate: [authGuard]},
    {path: 'lista-end', component: ListaEndComponent, canActivate:[authGuard]},
    {path: 'end', component: ResultadoEndComponent, canActivate: [authGuard]},
    {path: 'semestres', component: SemestresComponent, canActivate: [authGuard]},
    {path: 'aprobacion/:idAsignatura', component: AprobacionCursoComponent, canActivate: [authGuard]},
    {path: 'fluxograma/:idFluxograma', component: DetalleFluxogramaComponent, canActivate: [authGuard]},
    {path: 'estadisticas/:idAsignatura', component: EstadisticaDiagnosticoComponent, canActivate: [authGuard]},
    {path: 'practicas', component: PracticasComponent, canActivate: [authGuard]},
    {path: 'asignaturas', component: AsignaturasComponent, canActivate: [authGuard]},
    {path: 'detalle-asignatura/:idAsignatura', component: DetalleAsignaturaComponent, canActivate: [authGuard]},
    {path: 'asignatura-corte-practico', component: AsignaturaCortePracticoComponent, canActivate: [authGuard]},
    {path: 'avance-estudiante', component: AvanceEstudianteComponent, canActivate: [authGuard]},
    {path: 'practicas-estudiante', component: PracticasEstudianteComponent, canActivate: [authGuard] },
    {path: '**', redirectTo: '/menu'} 
    
];
