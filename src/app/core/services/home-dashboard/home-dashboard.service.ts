import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeDashboardService {
  constructor(private _httpClient: HttpClient) {}

  getHomeDashboardModules(): Observable<any> {
    return this._httpClient.get('/menus');
  }
}
