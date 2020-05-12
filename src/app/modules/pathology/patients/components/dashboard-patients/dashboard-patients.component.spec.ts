import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPatientsComponent } from './dashboard-patients.component';

describe('DashboardPatientsComponent', () => {
  let component: DashboardPatientsComponent;
  let fixture: ComponentFixture<DashboardPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPatientsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
