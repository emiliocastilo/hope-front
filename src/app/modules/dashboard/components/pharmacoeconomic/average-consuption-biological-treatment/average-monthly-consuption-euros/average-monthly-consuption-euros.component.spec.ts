import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageMonthlyConsuptionEurosComponent } from './average-monthly-consuption-euros.component';

describe('AverageMonthlyConsuptionEurosComponent', () => {
  let component: AverageMonthlyConsuptionEurosComponent;
  let fixture: ComponentFixture<AverageMonthlyConsuptionEurosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AverageMonthlyConsuptionEurosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageMonthlyConsuptionEurosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
