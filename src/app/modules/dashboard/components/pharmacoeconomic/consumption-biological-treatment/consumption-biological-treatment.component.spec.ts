import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionBiologicalTreatmentComponent } from './consumption-biological-treatment.component';

describe('ConsumptionBiologicalTreatmentComponent', () => {
    let component: ConsumptionBiologicalTreatmentComponent;
    let fixture: ComponentFixture<ConsumptionBiologicalTreatmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConsumptionBiologicalTreatmentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConsumptionBiologicalTreatmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
