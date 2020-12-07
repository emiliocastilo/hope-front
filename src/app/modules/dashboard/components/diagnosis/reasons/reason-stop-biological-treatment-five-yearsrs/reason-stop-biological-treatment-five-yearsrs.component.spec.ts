import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonStopBiologicalTreatmentFiveYearsrsComponent } from './reason-stop-biological-treatment-five-yearsrs.component';

describe('ReasonStopBiologicalTreatmentFiveYearsrsComponent', () => {
    let component: ReasonStopBiologicalTreatmentFiveYearsrsComponent;
    let fixture: ComponentFixture<ReasonStopBiologicalTreatmentFiveYearsrsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReasonStopBiologicalTreatmentFiveYearsrsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReasonStopBiologicalTreatmentFiveYearsrsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
