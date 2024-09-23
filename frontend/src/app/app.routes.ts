import { Routes } from '@angular/router';
import { FluxogramasComponent } from './components/fluxogramas/fluxogramas.component';
import { CursosComponent } from './components/cursos/cursos.component';

export const routes: Routes = [
    {path: 'fluxogramas', component: FluxogramasComponent},
    {path: 'cursos', component: CursosComponent},
    {path: '', redirectTo: '/cursos', pathMatch: 'full'},
    {path: '**', redirectTo: '/cursos'} 
];
