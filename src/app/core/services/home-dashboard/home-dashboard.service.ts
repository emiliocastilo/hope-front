import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from '../role/role.service';

@Injectable({
  providedIn: 'root'
})
export class HomeDashboardService {

  constructor(
    private _httpClient: HttpClient, 
    public _roleServices: RoleService
  ) { }

  getHomeDashboardModules(): Observable<any> {
    return this._httpClient.get(`/menu?role=${this._roleServices.currentUserRole}`);
  }
}