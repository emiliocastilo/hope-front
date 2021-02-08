import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientModel } from 'src/app/modules/pathology/models/patient.model';
import { PatientsService } from '../../management/services/patients/patients.service';

@Injectable({
    providedIn: 'root',
})
export class PatientsResolverService implements Resolve<Array<PatientModel>> {
    constructor(private patientsService: PatientsService) { }

    resolve (route: ActivatedRouteSnapshot): Observable<Array<PatientModel>> {
        return this.patientsService.getPatients([], '&page=0');
    }
}
