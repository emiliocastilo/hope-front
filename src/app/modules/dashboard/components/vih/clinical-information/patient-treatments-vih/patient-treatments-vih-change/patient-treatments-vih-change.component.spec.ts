import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTreatmentsVihChangeComponent } from './patient-treatments-vih-change.component';

describe('PatientTreatmentsVihChangeComponent', () => {
  let component: PatientTreatmentsVihChangeComponent;
  let fixture: ComponentFixture<PatientTreatmentsVihChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientTreatmentsVihChangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTreatmentsVihChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
