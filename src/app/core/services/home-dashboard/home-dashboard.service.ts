import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeDashboardService {

  constructor(private _httpClient: HttpClient) { }

  getHomeDashboardModules(): Observable<any> {
    return null//; this._httpClient.get('5e94a0133100007dbb5e335e');
  }
}
