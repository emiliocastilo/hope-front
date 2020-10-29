import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  constructor(private _httpClient: HttpClient) {}

  public event = new Subject();

  public getSideBar() {
    return this._httpClient.get('/menus').toPromise();
  }
}
