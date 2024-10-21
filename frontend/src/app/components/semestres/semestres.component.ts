import { Component } from '@angular/core';
import { SemestreService } from '../../services/semestre.service';
import { Semestre } from '../../models/semestre';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-semestres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semestres.component.html',
  styleUrl: './semestres.component.css',
})
export class SemestresComponent {
  sems = [] as Semestre[];
  constructor(private semService: SemestreService) {}

  ngOnInit() {
    this.sems = this.semService.obtenerSemestres();
  }

  irASemestre(sem: number) {
    alert(`Vas al semestre ${sem}`);
  }
}
