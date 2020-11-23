import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RolModel } from 'src/app/modules/management/models/rol.model';
import { ProfileModel } from '../../models/login/profile.model';
import { LoginService } from '../login/login.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentRoleListenerService {
  private subject = new Subject<RolModel>();

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    public _notification: NotificationService
  ) {}

  private setRole(data: ProfileModel): void {
    localStorage.setItem('role', JSON.stringify(data.role));
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user);
  }

  private chooseProfile(role: RolModel): void {
    this._loginService.postChooseProfile(role).subscribe(
      (data) => {
        const token = data.headers.get('Authorization');
        this.setRole(new ProfileModel(role, token, JSON.stringify(data.body)));
        this.subject.next(role);
        this._router.navigate(['/']);
      },
      (error) => this._notification.showErrorToast(error.errorCode)
    );
  }

  setCurrentRole(role: RolModel) {
    this.chooseProfile(role);
    this.subject.next(role);
  }

  getCurrentRole(): Observable<RolModel> {
    return this.subject.asObservable();
  }
}
