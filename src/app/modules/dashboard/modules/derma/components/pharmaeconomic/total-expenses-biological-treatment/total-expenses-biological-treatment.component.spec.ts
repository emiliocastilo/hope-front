import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpensesBiologicalTreatmentComponent } from './total-expenses-biological-treatment.component';

describe('TotalExpensesBiologicalTreatmentComponent', () => {
    let component: TotalExpensesBiologicalTreatmentComponent;
    let fixture: ComponentFixture<TotalExpensesBiologicalTreatmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TotalExpensesBiologicalTreatmentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TotalExpensesBiologicalTreatmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
