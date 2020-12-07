import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsByDlqiComponent } from './patients-by-dlqi.component';

describe('PatientsByDlqiComponent', () => {
    let component: PatientsByDlqiComponent;
    let fixture: ComponentFixture<PatientsByDlqiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PatientsByDlqiComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientsByDlqiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
