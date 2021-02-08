import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VihDashboardPatientsComponent } from './vih-dashboard-patients.component';

describe('VihDashboardPatientsComponent', () => {
    let component: VihDashboardPatientsComponent;
    let fixture: ComponentFixture<VihDashboardPatientsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VihDashboardPatientsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VihDashboardPatientsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
