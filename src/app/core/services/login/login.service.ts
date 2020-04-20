import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginModel } from '../../models/login.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<any>;
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
    return this._http.post('/login', login, { observe: 'response' })
      .pipe(                                
        map(res => {
          this.currentUserSubject.next(res);
          this._storeData(res);
          return res;
        })
      );
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

  postChooseProfile(role: string): Observable<any> {
    return this._http.post('/user/choose_profile/', role, { observe: 'response' })
      .pipe(map(res => {
        console.log("postChooseProfile:", role, res);
        this.currentUserSubject.next(res);
        //TODO: Acabar en tarea de enlace, cuando tengamos Back
        return res;
      }));
  }

  private _storeData(data: any): void {
    localStorage.setItem('roles', JSON.stringify(data.body.roles));
    localStorage.setItem('token', data.headers.get('Authorization'));
  }
}
