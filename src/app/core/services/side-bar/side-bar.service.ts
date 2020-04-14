import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  constructor(private _httpClient: HttpClient) {}

  public getSideBar():Observable<any>{
    return this._httpClient.get('5e8df57c310000391b429e73');
  }

}
