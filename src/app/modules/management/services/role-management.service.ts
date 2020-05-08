import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  constructor(private _httpClient:HttpClient) { }

  public getRoles():Observable<any>{
    return this._httpClient.get('/role');
  }
}
