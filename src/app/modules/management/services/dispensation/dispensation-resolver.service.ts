import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DispensationService } from './dispensation.service';
import { DispensationModel } from '../../models/dispensation/dispensation.model';

@Injectable({
  providedIn: 'root',
})
export class DispensationResolverService
  implements Resolve<Array<DispensationModel>> {
  constructor(private dispensationService: DispensationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<DispensationModel>> {
    return this.dispensationService.getAll('&page=0');
  }
}
