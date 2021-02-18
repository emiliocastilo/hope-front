import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTreatmentModalCreateComponent } from './principal-treatment-modal-create.component';

describe('PhototherapyModalComponent', () => {
    let component: PrincipalTreatmentModalCreateComponent;
    let fixture: ComponentFixture<PrincipalTreatmentModalCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipalTreatmentModalCreateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrincipalTreatmentModalCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
