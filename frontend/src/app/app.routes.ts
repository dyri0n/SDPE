import { Routes } from '@angular/router';
import { SemestresComponent } from './components/semestres/semestres.component';
import { AprobacionCursoComponent } from './components/aprobacion-curso/aprobacion-curso.component';
import { PracticasComponent } from './components/practicas/practicas.component';

export const routes: Routes = [
  {
    path: 'semestres',
    component: SemestresComponent,
  },
  {
    path: 'aprobacion',
    component: AprobacionCursoComponent,
  },
  {
    path: 'practicas',
    component: PracticasComponent,
  },
];
