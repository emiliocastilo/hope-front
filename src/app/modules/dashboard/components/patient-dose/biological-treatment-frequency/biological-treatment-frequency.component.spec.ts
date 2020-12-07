import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologicalTreatmentFrequencyComponent } from './biological-treatment-frequency.component';

describe('BiologicalTreatmentFrequencyComponent', () => {
    let component: BiologicalTreatmentFrequencyComponent;
    let fixture: ComponentFixture<BiologicalTreatmentFrequencyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BiologicalTreatmentFrequencyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BiologicalTreatmentFrequencyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
