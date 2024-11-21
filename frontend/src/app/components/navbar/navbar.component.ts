import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TreeModule } from 'primeng/tree';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ContextMenuModule } from 'primeng/contextmenu';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, ButtonModule, SidebarModule, MenuModule, TreeModule, ContextMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private servicioLogin: LoginService
  ){}
  
  public menuDesplegable: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', command: () => { this.perfil(); } },
    { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => { this.logout(); } }
  ];

  public opciones = [
    {
      label: 'Fluxogramas',
      data: 'Fluxogramas',
      routerLink: '/fluxogramas',
      children: [
        {
          label: 'Fluxograma 1',
          data: 'Fluxograma 1',
          routerLink: '/fluxograma/1', 
          children: [
            {
              label: 'semestres',
              data: 'semestres',
              routerLink: '/semestres', 
            },
          ]
        },
        {
          label: 'Fluxograma 1',
          data: 'Fluxograma 1',
          routerLink: '/fluxograma/2',
        },
      ],
    },
    {
      label: 'Asignaturas',
      data: 'Asignaturas',
      routerLink: '/asignaturas',
      children: [
        {
          label: 'Asignatura 1',
          data: 'Asignatura 1',
          routerLink: '/detalle-asignatura/1', 
        },
      ],
    },
    {
      label: 'Prácticas',
      data: 'Prácticas',
      routerLink: '/practicas', 
      children: [
        {
          label: 'Asignatura-corte-practico',
          data: 'Asignatura-corte-practico',
          routerLink: '/asignatura-corte-practico', 
        },
        {
          label: 'Estadisticas asignatura corte practico 1',
          data: 'Estadisticas asignatura corte practico 1',
          routerLink: '/estadisticas/1', 
        },
        {
          label: 'Practicas estudiante 1',
          data: 'Practicas estudiante 1',
          routerLink: '/practicas-estudiante', 
        },
      ],
    },
    {
      label: 'Convenios',
      data: 'Convenios',
      routerLink: '/convenios', 
      children: [
        {
          label: 'Convenio 1',
          data: 'Convenio 1',
          routerLink: '/convenio/1',
        },
      ],
    },
    {
      label: 'Avance individual',
      data: 'Avance individual',
      routerLink: '/avance-estudiante', 
      children: [
        {
          label: 'Curso 1',
          data: 'Curso 1',
          routerLink: '/cursos/1',
        },
        {
          label: 'Aprobacion curso 1',
          data: 'Aprobacion curso 1',
          routerLink: '/aprobacion/1',
        },
      ],
    },
    {
      label: 'END',
      data: 'END',
      routerLink: '/end',
    },
  ];

  public perfil() {
    // ir al perfil
  }
  
  public logout() {
    this.servicioLogin.logout();
  }

  public menu(){
    this.router.navigateByUrl('/menu')
  }

  barraLateralVisible = false;

  public seleccionarNodo(event: any) {
    const selectedNode = event.node;
    this.barraLateralVisible = false
    if (selectedNode.routerLink) {
      this.router.navigate([selectedNode.routerLink]);
    }
  }

  public mostrarBarraLateral() {
    this.barraLateralVisible = !this.barraLateralVisible;
  }

  // cierra el sidebar si se hace clic afuera
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.p-sidebar') as HTMLElement;
    
    if (sidebar && !sidebar.contains(target) && this.barraLateralVisible) {
      this.barraLateralVisible = false;
    }
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

}
