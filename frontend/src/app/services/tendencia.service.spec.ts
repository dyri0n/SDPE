/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TendenciaService } from './tendencia.service';

describe('Service: Tendencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TendenciaService]
    });
  });

  it('should ...', inject([TendenciaService], (service: TendenciaService) => {
    expect(service).toBeTruthy();
  }));
});
