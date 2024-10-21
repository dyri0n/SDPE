import { Component, OnInit } from '@angular/core';
import { CursoDTO } from '../../models/Curso.dto';
import { CursosService } from '../../services/Cursos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CursosComponent implements OnInit {

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cargarCursos()
  }


  cursos: CursoDTO[] = []
  semestreSeleccionado: number = 1

  public cargarCursos(): void {
    this.cursosService.getCursosPorSemestre(this.semestreSeleccionado).subscribe((cursos) => {
        this.cursos = cursos
    })
  }
}
