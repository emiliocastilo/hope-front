import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentInfoVihComponent } from './treatment-info-vih.component';

describe('TreatmentInfoVihComponent', () => {
    let component: TreatmentInfoVihComponent;
    let fixture: ComponentFixture<TreatmentInfoVihComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TreatmentInfoVihComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreatmentInfoVihComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
