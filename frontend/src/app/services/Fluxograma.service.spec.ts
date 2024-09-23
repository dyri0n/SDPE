/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FluxogramaService } from './Fluxograma.service';

describe('Service: Fluxograma', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FluxogramaService]
    });
  });

  it('should ...', inject([FluxogramaService], (service: FluxogramaService) => {
    expect(service).toBeTruthy();
  }));
});
