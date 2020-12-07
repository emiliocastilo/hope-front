import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PatientsIndicationService } from './patients-indication.service';
import { DispensationModel } from '../../models/dispensation/dispensation.model';

@Injectable({
    providedIn: 'root',
})
export class PatientsIndicationResolverService implements Resolve<Array<DispensationModel>> {
    constructor(private patientsIndicationService: PatientsIndicationService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Array<DispensationModel>> {
        return this.patientsIndicationService.getChart();
    }
}
