/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VIHTreatmentModalComponent } from './vih-treatment-modal.component';

describe('VIHTreatmentAddModalComponent', () => {
    let component: VIHTreatmentModalComponent;
    let fixture: ComponentFixture<VIHTreatmentModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VIHTreatmentModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VIHTreatmentModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
