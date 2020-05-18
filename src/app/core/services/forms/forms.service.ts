import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModel } from '../../models/forms/forms.model';
const PATH = '/templates';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private _http: HttpClient) {}

  public get(): any {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('token'));

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    return fetch(PATH + '?key=PLANTILLA_PRUEBA', requestOptions);
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // //DATOS_ SOCIODEMOGRAFICOS
    // return this._http
    //   .get<FormsModel>(PATH + '?key=PLANTILLA_PRUEBA', {
    //     headers: headers,
    //     observe: 'response',
    //   })
    //   .pipe(
    //     map((res) => {
    //       console.log('hola', res);
    //       return res;
    //     })
    //   );
  }
}
