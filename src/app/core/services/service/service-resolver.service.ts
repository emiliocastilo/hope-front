import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ServicesService } from '../service/service.service';
import { ServiceModel } from '../../models/service/service.model';

@Injectable({
    providedIn: 'root',
})
export class ServiceResolverService implements Resolve<Array<ServiceModel>> {
    constructor(private servicesService: ServicesService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Array<ServiceModel>> {
        return this.servicesService.getAll();
    }
}
