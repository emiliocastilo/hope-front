import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SideBarService } from '../../services/side-bar/side-bar.service';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';



@Injectable({
  providedIn: 'root'
})
export class SideBarResolverService implements Resolve<Array<SideBarItemModel>> {

  constructor(private sideBarService: SideBarService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<SideBarItemModel>> {
    return this.sideBarService.getSideBar();
  }
}
