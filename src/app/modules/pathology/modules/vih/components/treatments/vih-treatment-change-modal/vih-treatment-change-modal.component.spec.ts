/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VIHTreatmentChangeModalComponent } from './vih-treatment-change-modal.component';

describe('VIHTreatmentChangeModalComponent', () => {
    let component: VIHTreatmentChangeModalComponent;
    let fixture: ComponentFixture<VIHTreatmentChangeModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VIHTreatmentChangeModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VIHTreatmentChangeModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
