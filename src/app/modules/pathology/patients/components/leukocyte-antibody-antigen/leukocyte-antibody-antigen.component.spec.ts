import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeukocyteAntibodyAntigenComponent } from './leukocyte-antibody-antigen.component';

describe('LeukocyteAntibodyAntigenComponent', () => {
  let component: LeukocyteAntibodyAntigenComponent;
  let fixture: ComponentFixture<LeukocyteAntibodyAntigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeukocyteAntibodyAntigenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeukocyteAntibodyAntigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
