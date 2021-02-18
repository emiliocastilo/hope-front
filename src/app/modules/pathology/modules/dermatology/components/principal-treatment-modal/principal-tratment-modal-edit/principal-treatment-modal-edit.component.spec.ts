import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTreatmentModalEditComponent } from './principal-treatment-modal-edit.component';

describe('PhototherapyModalComponent', () => {
    let component: PrincipalTreatmentModalEditComponent;
    let fixture: ComponentFixture<PrincipalTreatmentModalEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipalTreatmentModalEditComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrincipalTreatmentModalEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
