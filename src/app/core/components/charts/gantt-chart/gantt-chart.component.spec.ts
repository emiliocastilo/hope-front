import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalColumnChartComponent } from './gantt-chart.component';

describe('HorizontalColumnChartComponent', () => {
  let component: HorizontalColumnChartComponent;
  let fixture: ComponentFixture<HorizontalColumnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalColumnChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
