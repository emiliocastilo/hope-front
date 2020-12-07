import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientExpensesVihComponent } from './patient-expenses-vih.component';

describe('PatientExpensesVihComponent', () => {
  let component: PatientExpensesVihComponent;
  let fixture: ComponentFixture<PatientExpensesVihComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientExpensesVihComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientExpensesVihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
