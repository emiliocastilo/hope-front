import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberChangesBiologicalTreatmentComponent } from './number-changes-biological-treatment.component';

describe('NumberChangesBiologicalTreatmentComponent', () => {
    let component: NumberChangesBiologicalTreatmentComponent;
    let fixture: ComponentFixture<NumberChangesBiologicalTreatmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NumberChangesBiologicalTreatmentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberChangesBiologicalTreatmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
