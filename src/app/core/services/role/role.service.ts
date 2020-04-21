import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  public get currentUserRole() {
    return localStorage.getItem('role');
  }

  public get userRoles() {
    return localStorage.getItem('roles') ? localStorage.getItem('roles') : "[]";
  }

}
