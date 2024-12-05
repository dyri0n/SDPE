import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { Menu, MenuModule } from 'primeng/menu';
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
  
  @ViewChild('menu') menu!: Menu;
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.menu && this.menu.overlayVisible) {
      this.menu.hide();
    }
  }
  public menuDesplegable: MenuItem[] = [
    // { label: 'Perfil', icon: 'pi pi-user', command: () => { this.perfil(); } },
    { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => { this.logout(); } }
  ];

  public opciones = [
    {
      label: 'Fluxogramas',
      data: 'Fluxogramas',
      routerLink: '/fluxogramas',
    },
    {
      label: 'Asignaturas',
      data: 'Asignaturas',
      routerLink: '/asignaturas',
    },
    {
      label: 'Convenios',
      data: 'Convenios',
      routerLink: '/convenios', 
    },
    {
      label: 'Tendencias de Corte Práctico',
      data: 'END',
      routerLink: '/ver-tendencias',
    },
    {
      label: 'Avance individual',
      data: 'Avance individual',
      routerLink: '/listar-estudiantes', 
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

  public irAMenu(){
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
