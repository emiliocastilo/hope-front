import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleManagementService } from './role-management.service';
import { RolModel } from '../../models/rol.model';

@Injectable({
  providedIn: 'root',
})
export class RoleManagementResolverService implements Resolve<Array<RolModel>> {
  constructor(private roleService: RoleManagementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<RolModel>> {
    return this.roleService.getRoles('&page=0');
  }
}
