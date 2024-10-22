import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CardModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    private router: Router
  ){}

  public redirigirHacia(route: string) {
    this.router.navigateByUrl(`/${route}`);
  }

}
