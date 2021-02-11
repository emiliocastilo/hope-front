import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DermathologyDashboardPatientsComponent } from './dermathology-dashboard-patients.component';

describe('DermathologyDashboardPatientsComponent', () => {
    let component: DermathologyDashboardPatientsComponent;
    let fixture: ComponentFixture<DermathologyDashboardPatientsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DermathologyDashboardPatientsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DermathologyDashboardPatientsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
