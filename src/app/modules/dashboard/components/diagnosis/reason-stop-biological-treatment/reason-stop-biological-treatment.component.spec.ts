import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonStopBiologicalTreatmentComponent } from './reason-stop-biological-treatment.component';

describe('ReasonStopBiologicalTreatmentComponent', () => {
  let component: ReasonStopBiologicalTreatmentComponent;
  let fixture: ComponentFixture<ReasonStopBiologicalTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReasonStopBiologicalTreatmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonStopBiologicalTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
