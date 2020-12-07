import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTreatmentModalComponent } from './principal-treatment-modal.component';

describe('PhototherapyModalComponent', () => {
    let component: PrincipalTreatmentModalComponent;
    let fixture: ComponentFixture<PrincipalTreatmentModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipalTreatmentModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrincipalTreatmentModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
