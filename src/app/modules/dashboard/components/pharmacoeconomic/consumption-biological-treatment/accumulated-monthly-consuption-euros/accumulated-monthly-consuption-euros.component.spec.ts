import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedMonthlyConsuptionEurosComponent } from './accumulated-monthly-consuption-euros.component';

describe('AccumulatedMonthlyConsuptionEurosComponent', () => {
  let component: AccumulatedMonthlyConsuptionEurosComponent;
  let fixture: ComponentFixture<AccumulatedMonthlyConsuptionEurosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccumulatedMonthlyConsuptionEurosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AccumulatedMonthlyConsuptionEurosComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
