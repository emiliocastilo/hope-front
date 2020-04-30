import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { HospitalService } from './hospital.service';
import { HospitalModel } from '../../models/hospital/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalResolverService implements Resolve<Array<HospitalModel>> {
  constructor(private hospitalService: HospitalService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<HospitalModel>> {
    return this.hospitalService.getAll();
  }
}
