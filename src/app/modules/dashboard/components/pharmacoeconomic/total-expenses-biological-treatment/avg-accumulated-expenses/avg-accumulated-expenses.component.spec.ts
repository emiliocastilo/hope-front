import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgAccumulatedExpensesComponent } from './avg-accumulated-expenses.component';

describe('AvgAccumulatedExpensesComponent', () => {
  let component: AvgAccumulatedExpensesComponent;
  let fixture: ComponentFixture<AvgAccumulatedExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvgAccumulatedExpensesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgAccumulatedExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
