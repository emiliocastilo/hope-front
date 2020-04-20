import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //const currentUser = this._loginService.currentUserValue;

    if (!this._controlExpirationToken(localStorage.getItem('token'))) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
  /**Funcionalidad para descodiicar token */
  private _controlExpirationToken(token: string = '') {
    let expired = false;
    const decodeToken = this._decodeToken(token);
    if (new Date(decodeToken.exp * 1000).getTime() < new Date().getTime()) {
      expired = true;
    }
    return expired;
  }
  private _urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  private _decodeToken(token: string = '') {
    if (token === null || token === '') { return { 'upn': '' }; }
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    const decoded = this._urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }
}
