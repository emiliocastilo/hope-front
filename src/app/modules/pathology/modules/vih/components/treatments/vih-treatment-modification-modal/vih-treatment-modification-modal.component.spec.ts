/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VIHTreatmentModificationModalComponent } from './vih-treatment-modification-modal.component';

describe('VIHTreatmentModificationModalComponent', () => {
  let component: VIHTreatmentModificationModalComponent;
  let fixture: ComponentFixture<VIHTreatmentModificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VIHTreatmentModificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VIHTreatmentModificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
