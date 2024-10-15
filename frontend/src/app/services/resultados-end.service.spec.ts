import { TestBed } from '@angular/core/testing';

import { ResultadosENDService } from './resultados-end.service';

describe('ResultadosENDService', () => {
  let service: ResultadosENDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadosENDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
