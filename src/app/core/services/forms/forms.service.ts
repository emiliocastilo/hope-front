import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const PATH = '/templates';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private _http: HttpClient) {}

  public get(): Observable<any> {
    //DATOS_ SOCIODEMOGRAFICOS
    return this._http.get(PATH + '?key=PLANTILLA_PRUEBA', {
      observe: 'response',
    });
  }
}
