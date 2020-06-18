import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyConsuptionEurosComponent } from './monthly-consuption-euros.component';

describe('MonthlyConsuptionEurosComponent', () => {
  let component: MonthlyConsuptionEurosComponent;
  let fixture: ComponentFixture<MonthlyConsuptionEurosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyConsuptionEurosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyConsuptionEurosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
