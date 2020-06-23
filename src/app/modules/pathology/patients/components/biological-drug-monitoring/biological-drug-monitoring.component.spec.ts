import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalDrugMonitoringComponent } from './biological-drug-monitoring.component';

describe('BiologicalDrugMonitoringComponent', () => {
  let component: BiologicalDrugMonitoringComponent;
  let fixture: ComponentFixture<BiologicalDrugMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BiologicalDrugMonitoringComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiologicalDrugMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
