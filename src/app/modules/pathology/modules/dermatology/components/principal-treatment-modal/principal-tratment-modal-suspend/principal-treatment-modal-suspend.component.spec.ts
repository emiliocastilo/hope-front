import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTreatmentModalSuspendComponent } from './principal-treatment-modal-suspend.component';

describe('PhototherapyModalComponent', () => {
    let component: PrincipalTreatmentModalSuspendComponent;
    let fixture: ComponentFixture<PrincipalTreatmentModalSuspendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipalTreatmentModalSuspendComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrincipalTreatmentModalSuspendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
