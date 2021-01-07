/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VIHTreatmentAddModalComponent } from './vih-treatment-add-modal.component';

describe('VIHTreatmentAddModalComponent', () => {
  let component: VIHTreatmentAddModalComponent;
  let fixture: ComponentFixture<VIHTreatmentAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VIHTreatmentAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VIHTreatmentAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
