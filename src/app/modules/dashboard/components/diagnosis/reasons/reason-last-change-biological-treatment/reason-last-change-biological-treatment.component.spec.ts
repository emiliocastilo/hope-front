import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonLastChangeBiologicalTreatmentComponent } from './reason-last-change-biological-treatment.component';

describe('ReasonLastChangeBiologicalTreatmentComponent', () => {
    let component: ReasonLastChangeBiologicalTreatmentComponent;
    let fixture: ComponentFixture<ReasonLastChangeBiologicalTreatmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReasonLastChangeBiologicalTreatmentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReasonLastChangeBiologicalTreatmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
