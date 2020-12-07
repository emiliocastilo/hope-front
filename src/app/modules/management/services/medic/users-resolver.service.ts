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
        const user_aux = JSON.parse(localStorage.getItem('user') || '{}');
        return this.UsersService.getAll(user_aux['rolSelected']['id'], '&page=0');
    }
}
