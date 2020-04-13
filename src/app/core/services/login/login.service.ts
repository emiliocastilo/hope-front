import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginModel } from '../../models/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<LoginModel>;
  public currentUser: Observable<LoginModel>;

  constructor(
    private _http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<LoginModel>(JSON.parse(localStorage.getItem('login')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginModel {
    return this.currentUserSubject.value;
  }

  login(login: LoginModel): Observable<any> {
    return this._http.post('/login', login)
      .pipe(map(res => {
        let response: any = res;
        if (response && response.roles) {
          localStorage.setItem('roles', JSON.stringify(response.roles));
          //this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('login');
    this.currentUserSubject.next(null);
  }

  isLogin() {
    //comporbar token
    return (localStorage.getItem('token')) ? true : false;
  }

  resetPassword(email: String): Observable<any> {
    return this._http.post('/reset-password', email);
  }

}
