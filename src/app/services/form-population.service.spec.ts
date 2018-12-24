import { TestBed, inject } from '@angular/core/testing';

import { FormPopulationService } from './form-population.service';

describe('FormPopulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormPopulationService]
    });
  });

  it('should be created', inject([FormPopulationService], (service: FormPopulationService) => {
    expect(service).toBeTruthy();
  }));
});
