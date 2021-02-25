import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsTreatmentComponent } from './patients-treatment.component';

describe('PatientsTreatmentComponent', () => {
    let component: PatientsTreatmentComponent;
    let fixture: ComponentFixture<PatientsTreatmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PatientsTreatmentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientsTreatmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
