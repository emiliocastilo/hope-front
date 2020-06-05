import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolModel } from '../../models/rol.model';

@Injectable({
  providedIn: 'root',
})
export class RoleManagementService {
  constructor(private _httpClient: HttpClient) {}

  public getRoles(query?: string): Observable<any> {
    query = query ? query : '';
    return this._httpClient.get(`/roles?${query}`);
  }

  public getAllRoles(): Observable<any> {
    return this._httpClient.get('/roles/all');
  }

  public getRoleById(id: string): Observable<any> {
    return this._httpClient.get(`/roles/${id}`);
  }

  public createRole(rol: RolModel): Observable<any> {
    return this._httpClient.post('/roles', rol);
  }

  public updateRole(rol: RolModel): Observable<any> {
    return this._httpClient.put('/roles', rol);
  }

  public deleteRole(id: string): Observable<any> {
    return this._httpClient.delete(`/roles/${id}`);
  }

  public getMenusRol(id: string): Observable<any> {
    return this._httpClient.get(`/roles/menus/${id}`);
  }

  public getRolSearches(search?: string) {
    return this._httpClient.get(`/roles/searches?name=${search}&size=10`);
  }
}
