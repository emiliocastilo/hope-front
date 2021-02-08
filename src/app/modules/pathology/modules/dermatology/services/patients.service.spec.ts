import { TestBed } from '@angular/core/testing';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';

describe('PatientsService', () => {
    let service: PatientsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PatientsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
