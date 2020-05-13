import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MedicService } from './medic.service';
import { MedicModel } from '../../models/medic/medic.model';

@Injectable({
  providedIn: 'root',
})
export class MedicResolverService implements Resolve<Array<MedicModel>> {
  constructor(private medicService: MedicService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<MedicModel>> {
    return this.medicService.getAll('&page=0');
  }
}
