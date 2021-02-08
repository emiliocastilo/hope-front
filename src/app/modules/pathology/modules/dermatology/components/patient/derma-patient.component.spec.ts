/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DermaPatientComponent } from './derma-patient.component';

describe('DermaPatientComponent', () => {
  let component: DermaPatientComponent;
  let fixture: ComponentFixture<DermaPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DermaPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DermaPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
