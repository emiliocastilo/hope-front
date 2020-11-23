import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RolModel } from 'src/app/modules/management/models/rol.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentRoleListenerService {
  private subject = new Subject<RolModel>();

  constructor() {}

  setCurrentRole(role: RolModel) {
    this.subject.next(role);
  }

  getCurrentRole(): Observable<RolModel> {
    return this.subject.asObservable();
  }
}
