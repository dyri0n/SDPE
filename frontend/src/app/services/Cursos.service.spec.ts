/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CursosService } from './Cursos.service';

describe('Service: Cursos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursosService]
    });
  });

  it('should ...', inject([CursosService], (service: CursosService) => {
    expect(service).toBeTruthy();
  }));
});
