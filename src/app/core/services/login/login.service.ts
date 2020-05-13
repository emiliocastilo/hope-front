import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginModel } from '../../models/login/login.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<LoginModel>;

  constructor(private _http: HttpClient, private _router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginModel>(
      JSON.parse(localStorage.getItem('login'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginModel {
    return this.currentUserSubject.value;
  }

  login(login: LoginModel): Observable<any> {
    return this._http.post('/login', login, { observe: 'response' }).pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        this._storeData(res);
        return res;
      })
    );
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this._router.navigate(['/login']);
  }

  isLogin() {
    // comporbar token
    return localStorage.getItem('token') ? true : false;
  }

  resetPassword(email: string): Observable<any> {
    return this._http.post('/reset-passwords', email);
  }

  postChooseProfile(role: string): Observable<any> {
    return this._http
      .post('/users/choose-profiles/', role, { observe: 'response' })
      .pipe(
        map((res) => {
          this.currentUserSubject.next(res);
          // TODO: Acabar en tarea de enlace, cuando tengamos Back
          return res;
        })
      );
  }

  private _storeData(data: any): void {
    localStorage.setItem('roles', JSON.stringify(data.body.roles));
    localStorage.setItem('token', data.headers.get('Authorization'));
  }
}
