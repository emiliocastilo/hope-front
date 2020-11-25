import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedExpensesComponent } from './accumulated-expenses.component';

describe('AccumulatedExpensesComponent', () => {
  let component: AccumulatedExpensesComponent;
  let fixture: ComponentFixture<AccumulatedExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccumulatedExpensesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccumulatedExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
