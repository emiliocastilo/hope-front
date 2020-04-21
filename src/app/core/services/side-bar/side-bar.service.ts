import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from '../role/role.service';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  constructor(
    private _httpClient: HttpClient,
    public _roleServices: RoleService
  ) { }

  public getSideBar(): Observable<any> {
    return this._httpClient.get('/menu');
  }

}
