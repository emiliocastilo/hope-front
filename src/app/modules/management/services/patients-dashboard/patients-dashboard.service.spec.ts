import { TestBed } from '@angular/core/testing';

import { PatientsDashboardService } from './patients-dashboard.service';

describe('PatientsDashboardService', () => {
    let service: PatientsDashboardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PatientsDashboardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
