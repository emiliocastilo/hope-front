import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginModel } from '../../models/login.model';

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
    return this._http.post('/login', login);
    /*TODO: pipe realizado para procesar petición, por ver como nos lleva
     .pipe(map(user => {
       if (user && user.token) {
         localStorage.setItem('currentUser', JSON.stringify(user.result));
         this.currentUserSubject.next(user);
       }
    
       return user;
     }));
    */
  }

  logout() {
    localStorage.removeItem('login');
    this.currentUserSubject.next(null);
  }

  isLogin() {
    //comporbar token
    return (localStorage.getItem('token')) ? true : false;
  }

}
