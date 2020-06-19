import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgExpensesComponent } from './avg-expenses.component';

describe('AvgExpensesComponent', () => {
  let component: AvgExpensesComponent;
  let fixture: ComponentFixture<AvgExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvgExpensesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
