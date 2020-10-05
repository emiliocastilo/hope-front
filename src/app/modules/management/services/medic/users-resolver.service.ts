import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from './users.service';
import { UsersModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersResolverService implements Resolve<Array<UsersModel>> {
  constructor(private UsersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<UsersModel>> {
    return this.UsersService.getAll('&page=0');
  }
}
