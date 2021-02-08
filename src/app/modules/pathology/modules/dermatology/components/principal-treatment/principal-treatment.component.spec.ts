import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTreatmentComponent } from './principal-treatment.component';

describe('PrincipalTreatmentComponent', () => {
    let component: PrincipalTreatmentComponent;
    let fixture: ComponentFixture<PrincipalTreatmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrincipalTreatmentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrincipalTreatmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
