import { Component, OnInit } from '@angular/core';
import { CursoDTO } from '../../models/Curso.dto';
import { CursosService } from '../../services/Cursos.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CursosComponent implements OnInit {

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idAsignatura= +this.route.snapshot.paramMap.get('idAsignatura')!
    this.cargarCursos()
  }


  cursos: CursoDTO[] = []
  public idAsignatura: number=0
  semestreSeleccionado: number = 1

  public cargarCursos(): void {
    this.cursosService.getCursosPorSemestre(this.semestreSeleccionado).subscribe((cursos) => {
        this.cursos = cursos
    })
  }
}
