import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PatientsTreatmentsService } from './patients-treatments.service';
import { DispensationModel } from '../../models/dispensation/dispensation.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsTreatmentsResolverService
  implements Resolve<Array<DispensationModel>> {
  constructor(private patientsIndicationService: PatientsTreatmentsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Array<DispensationModel>> {
    return this.patientsIndicationService.getPatientsTreatmentFindPatients(
      route.data.type,
      route.data.indication
    );
  }
}
