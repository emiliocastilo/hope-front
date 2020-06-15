import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsCombinedTreatmentsComponent } from './patients-combined-treatments.component';

describe('PatientsCombinedTreatmentsComponent', () => {
  let component: PatientsCombinedTreatmentsComponent;
  let fixture: ComponentFixture<PatientsCombinedTreatmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsCombinedTreatmentsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsCombinedTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
