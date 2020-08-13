import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from './users.service';
import { UserModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersResolverService implements Resolve<Array<UserModel>> {
  constructor(private UsersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<UserModel>> {
    return this.UsersService.getAll('&page=0');
  }
}
