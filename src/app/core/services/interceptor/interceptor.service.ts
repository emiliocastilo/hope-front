import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqUrl = environment.URL_API;
    req = req.clone({
      headers: req.headers.set(
        "Authorization",
        this._setAuthorizations()
      ),
      url: reqUrl + "" + req.url
    });
    return next.handle(req);
  }

  private _setAuthorizations(): string {
    let token = localStorage.getItem("token") || '';

    if (token !== null && token !== '') {
      if (!token.includes("Bearer ")) {
        token = "Bearer " + localStorage.getItem("token");
      }
    }
    return token;
  }
}