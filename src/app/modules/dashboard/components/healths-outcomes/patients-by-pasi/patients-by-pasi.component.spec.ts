import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsByPasiComponent } from './patients-by-pasi.component';

describe('PatientsByPasiComponent', () => {
  let component: PatientsByPasiComponent;
  let fixture: ComponentFixture<PatientsByPasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsByPasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsByPasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
