import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
const PATH = '/templates';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private _http: HttpClient) {}

  public get(): any {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
      observe: 'response',
    };
    return this._http.get(PATH + '?key=PLANTILLA_PRUEBA', HTTPOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
