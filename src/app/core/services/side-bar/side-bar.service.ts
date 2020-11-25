import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  constructor(private _httpClient: HttpClient) {}

  public currentSection = new Subject<SideBarItemModel>();
  public event = new Subject();

  setCurrentSection(section: SideBarItemModel) {
    this.currentSection.next(section);
  }

  getCurrentSection(): Observable<SideBarItemModel> {
    return this.currentSection.asObservable();
  }

  public getSideBar() {
    return this._httpClient.get('/menus').toPromise();
  }
}
