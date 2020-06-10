import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsByPgaComponent } from './patients-by-pga.component';

describe('PatientsByPgaComponent', () => {
  let component: PatientsByPgaComponent;
  let fixture: ComponentFixture<PatientsByPgaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsByPgaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsByPgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
