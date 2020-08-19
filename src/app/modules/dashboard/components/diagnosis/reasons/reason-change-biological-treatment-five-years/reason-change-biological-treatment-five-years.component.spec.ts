import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonChangeBiologicalTreatmentFiveYearsComponent } from './reason-change-biological-treatment-five-years.component';

describe('ReasonChangeBiologicalTreatmentFiveYearsComponent', () => {
  let component: ReasonChangeBiologicalTreatmentFiveYearsComponent;
  let fixture: ComponentFixture<ReasonChangeBiologicalTreatmentFiveYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReasonChangeBiologicalTreatmentFiveYearsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ReasonChangeBiologicalTreatmentFiveYearsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
