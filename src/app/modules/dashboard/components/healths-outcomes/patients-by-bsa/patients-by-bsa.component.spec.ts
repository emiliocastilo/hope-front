import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsByBsaComponent } from './patients-by-bsa.component';

describe('PatientsByBsaComponent', () => {
  let component: PatientsByBsaComponent;
  let fixture: ComponentFixture<PatientsByBsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsByBsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsByBsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
