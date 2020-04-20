import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeDashboardService {

  constructor(private _httpClient: HttpClient) { }

  getHomeDashboardModules(): Observable<any> {
    const role = localStorage.getItem('role');
    console.log("getHomeDashboardModules: ", role);
    return this._httpClient.get(`/menu?role=${role}`);
  }
}