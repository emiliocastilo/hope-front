import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientsService } from 'src/app/modules/dermatology/patients/services/patients.service';
import { PatientModel } from 'src/app/modules/dermatology/patients/models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsResolverService implements Resolve<Array<PatientModel>> {
  constructor(private patientsService: PatientsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<PatientModel>> {
    return this.patientsService.getPatients();
  }
}
