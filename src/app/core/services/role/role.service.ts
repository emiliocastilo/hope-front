import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor() {}

    public get currentUserRole() {
        return JSON.parse(localStorage.getItem('user')).rolSelected;
    }

    /* public get userRoles() {
    const user = JSON.parse(localStorage.getItem('user'));
    const roles = JSON.stringify(JSON.parse(localStorage.getItem('user')).roles);
    return this.checkVarValue(roles)
      ? roles
      : '[]';
  } */
    public get userRoles() {
        return this.checkVarValue(localStorage.getItem('roles')) ? localStorage.getItem('roles') : '[]';
    }

    checkVarValue(value: any) {
        const pass = value !== 'undefined' && value !== '' && value !== null && value !== 'null';
        return pass;
    }
}
