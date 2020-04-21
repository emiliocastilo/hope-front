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
    return this.checkVarValue(localStorage.getItem('roles')) ? localStorage.getItem('roles') : "[]";
  }

  checkVarValue(value: any) {
    const pass = (value !== "undefined" && value !== "" && value !== null &&  value !== "null");
    return pass;
  }

}
