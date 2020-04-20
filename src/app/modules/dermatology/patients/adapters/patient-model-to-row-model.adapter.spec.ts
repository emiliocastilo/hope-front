import { TestBed } from '@angular/core/testing';

import { PatientModelToRowModelAdapter } from './patient-model-to-row-model.adapter';

describe('PatientModelToRowModelAdapter', () => {
  let service: PatientModelToRowModelAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientModelToRowModelAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
