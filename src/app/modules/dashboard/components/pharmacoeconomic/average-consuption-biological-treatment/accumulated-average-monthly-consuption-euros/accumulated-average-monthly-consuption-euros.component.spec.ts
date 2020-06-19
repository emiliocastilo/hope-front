import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedAverageMonthlyConsuptionEurosComponent } from './accumulated-average-monthly-consuption-euros.component';

describe('AcumulatedAverageMonthlyConsuptionEurosComponent', () => {
  let component: AccumulatedAverageMonthlyConsuptionEurosComponent;
  let fixture: ComponentFixture<AccumulatedAverageMonthlyConsuptionEurosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccumulatedAverageMonthlyConsuptionEurosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AccumulatedAverageMonthlyConsuptionEurosComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
