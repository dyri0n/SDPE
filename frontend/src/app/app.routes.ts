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
import { AvanceEstudianteComponent } from './components/avance-estudiante/avance-estudiante.component';
import { EstudiantePracticas } from './models/estudiante';
import { PracticasEstudianteComponent } from './components/practicas-estudiante/practicas-estudiante.component';

export const routes: Routes = [
  { path: 'fluxogramas', component: FluxogramasComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'end', component: ResultadoEndComponent },
  { path: 'semestres', component: SemestresComponent },
  { path: 'aprobacion', component: AprobacionCursoComponent },
  { path: 'fluxograma', component: DetalleFluxogramaComponent },
  { path: 'estadisticas', component: EstadisticaDiagnosticoComponent },
  { path: 'practicas', component: PracticasComponent },
  {
    path: 'asignatura-corte-practico',
    component: AsignaturaCortePracticoComponent,
  },
  { path: 'avance-estudiante', component: AvanceEstudianteComponent },
  { path: 'practicas-estudiante', component: PracticasEstudianteComponent },
  { path: '', redirectTo: '/cursos', pathMatch: 'full' },
  { path: '**', redirectTo: '/cursos' },
];
