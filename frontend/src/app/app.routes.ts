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
import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { DetalleAsignaturaComponent } from './components/detalle-asignatura/detalle-asignatura.component';
import { AvanceEstudianteComponent } from './components/avance-estudiante/avance-estudiante.component';
import { PracticasEstudianteComponent } from './components/practicas-estudiante/practicas-estudiante.component';

export const routes: Routes = [
  { path: 'fluxogramas', component: FluxogramasComponent },
  { path: 'convenios', component: ListaConveniosComponent },
  { path: 'convenio/:idConvenio', component: ConvenioComponent },
  { path: 'cursos/:idAsignatura', component: CursosComponent },
  { path: 'end', component: ResultadoEndComponent },
  { path: 'semestres', component: SemestresComponent },
  { path: 'aprobacion/:idAsignatura', component: AprobacionCursoComponent },
  { path: 'fluxograma/:idFluxograma', component: DetalleFluxogramaComponent },
  {
    path: 'estadisticas/:idAsignatura',
    component: EstadisticaDiagnosticoComponent,
  },
  { path: 'practicas', component: PracticasComponent },
  {
    path: 'asignatura-corte-practico',
    component: AsignaturaCortePracticoComponent,
  },
  { path: 'asignaturas', component: AsignaturasComponent },
  { path: 'avance-estudiante', component: AvanceEstudianteComponent },
  { path: 'practicas-estudiante', component: PracticasEstudianteComponent },
  {
    path: 'detalle-asignatura/:idAsignatura',
    component: DetalleAsignaturaComponent,
  },
  { path: '', redirectTo: '/fluxogramas', pathMatch: 'full' },
  { path: '**', redirectTo: '/fluxogramas' },
];
