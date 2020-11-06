import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';
import { PatientsService } from './patients.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsResolverService implements Resolve<Array<PatientModel>> {
  constructor(private patientsService: PatientsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<PatientModel>> {
    const user_aux = JSON.parse(localStorage.getItem('user') || '{}');
    let pathology_id = [];
    if (user_aux['rolSelected']['pathology'] != null) {
      pathology_id = user_aux['rolSelected']['pathology']['id'];
    }
    return this.patientsService.getPatients(pathology_id, '&page=0');
  }
}
