import { Routes } from '@angular/router';
import { FluxogramasComponent } from './components/fluxogramas/fluxogramas.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { SemestresComponent } from './components/semestres/semestres.component';
import { AprobacionCursoComponent } from './components/aprobacion-curso/aprobacion-curso.component';
import { DetalleFluxogramaComponent } from './components/detalle-fluxograma/detalle-fluxograma.component';
import { EstadisticaDiagnosticoComponent } from './components/estadistica-diagnostico/estadistica-diagnostico.component';
import { PracticasComponent } from './components/practicas/practicas.component';

export const routes: Routes = [
    {path: 'fluxogramas', component: FluxogramasComponent},
    {path: 'cursos', component: CursosComponent},
    {path: 'semestres', component: SemestresComponent},
    {path: 'aprobacion', component: AprobacionCursoComponent},
    {path: 'fluxograma', component: DetalleFluxogramaComponent},
    {path: 'estadisticas', component: EstadisticaDiagnosticoComponent},
    {path: 'practicas', component: PracticasComponent},
    {path: '', redirectTo: '/cursos', pathMatch: 'full'},
    {path: '**', redirectTo: '/cursos'} 
];
